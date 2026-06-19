The HTTP server plugins (codenamed as *handler plugins*) belong to the **router layer** and let you modify the requests before Pucora starts processing them or modify the final response back to the user. The HTTP handler plugin lets you write your servers and HTTP middlewares right in Pucora and enables you to implement anything you can imagine. This plugin type is so powerful that you can use it to implement custom monetization, tracking, tenant control, protocol conversion, and heavy modifications, for example.

> **What is a Handler?**
>
> A Handler responds to an HTTP request and is an interface modeling an HTTP processor.

From Pucora's perspective, **your handler plugins are black boxes** that expose an `http.Handler`, and you can do anything you want inside them. Each plugin is wrapping the next element in the pipe, meaning that for some operations, **it must deal with an HTTP request and response writer**. If you chain several plugins, you will add **two extra cycles** of decoding and encoding the body. From a performance perspective is better having one plugin doing two things, than two plugins doing one thing:



*[Image: /images/documentation/http-handler-plugin.png]*



## HTTP handler interface
> **Writing plugins**
>
> Read the introduction to [writing plugins](/docs/extending/writing-plugins/) for compilation and configuration options if you haven't done it yet.

To start with a *hello world* for your first plugin, you have to implement the plugin server interface provided in the [Go documentation](https://godoc.org/github.com/luraproject/lura/transport/http/server/plugin). A step-by-step example follows below.

### Example: Building your first server plugin
The easiest way to demonstrate how HTTP server plugins work is with a hello world plugin. So let's start by creating a new Go project named `pucora-server-example`:

    mkdir pucora-server-example
    cd pucora-server-example
    go mod init pucora-server-example

Now we have to create a file `main.go` with the content below:

```go
// SPDX-License-Identifier: Apache-2.0

package main

import (
	"context"
	"errors"
	"fmt"
	"html"
	"net/http"
)

// pluginName is the plugin name
var pluginName = "pucora-server-example"

// HandlerRegisterer is the symbol the plugin loader will try to load. It must implement the Registerer interface
var HandlerRegisterer = registerer(pluginName)

type registerer string

func (r registerer) RegisterHandlers(f func(
	name string,
	handler func(context.Context, map[string]interface{}, http.Handler) (http.Handler, error),
)) {
	f(string(r), r.registerHandlers)
}

func (r registerer) registerHandlers(_ context.Context, extra map[string]interface{}, h http.Handler) (http.Handler, error) {
	// If the plugin requires some configuration, it should be under the name of the plugin. E.g.:
	/*
	   "extra_config":{
	       "plugin/http-server":{
	           "name":["pucora-server-example"],
	           "pucora-server-example":{
	               "path": "/some-path"
	           }
	       }
	   }
	*/
	// The config variable contains all the keys you have defined in the configuration
	// if the key doesn't exists or is not a map the plugin returns an error and the default handler
	config, ok := extra[pluginName].(map[string]interface{})
	if !ok {
		return h, errors.New("configuration not found")
	}

	// The plugin will look for this path:
	path, _ := config["path"].(string)
	logger.Debug(fmt.Sprintf("The plugin is now hijacking the path %s", path))

	// return the actual handler wrapping or your custom logic so it can be used as a replacement for the default http handler
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {

		// If the requested path is not what we defined, continue.
		if req.URL.Path != path {
			h.ServeHTTP(w, req)
			return
		}

		// The path has to be hijacked:
		fmt.Fprintf(w, "Hello, %q", html.EscapeString(req.URL.Path))
		logger.Debug("request:", html.EscapeString(req.URL.Path))
	}), nil
}

func main() {}

// This logger is replaced by the RegisterLogger method to load the one from Pucora
var logger Logger = noopLogger{}

func (registerer) RegisterLogger(v interface{}) {
	l, ok := v.(Logger)
	if !ok {
		return
	}
	logger = l
	logger.Debug(fmt.Sprintf("[PLUGIN: %s] Logger loaded", HandlerRegisterer))
}

type Logger interface {
	Debug(v ...interface{})
	Info(v ...interface{})
	Warning(v ...interface{})
	Error(v ...interface{})
	Critical(v ...interface{})
	Fatal(v ...interface{})
}

// Empty logger implementation
type noopLogger struct{}

func (n noopLogger) Debug(_ ...interface{})    {}
func (n noopLogger) Info(_ ...interface{})     {}
func (n noopLogger) Warning(_ ...interface{})  {}
func (n noopLogger) Error(_ ...interface{})    {}
func (n noopLogger) Critical(_ ...interface{}) {}
func (n noopLogger) Fatal(_ ...interface{})    {}
```

The plugin above aborts the request and replies itself printing a `Hello, %q` without actually passing the request to the endpoint. It is a simple example, but it shows the necessary structure to start working with plugins.

If you look now closely at the plugin code, notice that the loader looks for the symbol `HandlerRegisterer` and, if found, the loader checks if the symbol implements the `plugin.Registerer` interface. Once the plugin is validated, the loader registers handlers from the plugin by calling the exposed `RegisterHandlers` method.

With the `main.go` file saved, it's time to build and test the plugin. If you added more code and external dependencies, you must run a `go mod tidy` before the compilation, but it is unnecessary for this example.

For compiling Go plugins, the flag `-buildmode=plugin` is required. The command is:



```bash
go build -buildmode=plugin -o pucora-server-example.so .
```


If you are using Docker and wanting to load your plugin on Docker, compile it in the [Plugin Builder](/docs/extending/writing-plugins/#plugin-builder) for an easier integration.



**Build your plugin**

```bash
docker run -it -v "$PWD:/app" -w /app \
: \
go build -buildmode=plugin -o pucora-server-example.so .
```


There is no output for this command. Now you have a file `pucora-server-example.so`, the binary that Pucora has to side load. Remember that you cannot use this binary in a different architecture (e.g., compiling the binary in Mac and loading it in a Docker container).

The plugin is ready to use! You can now load your plugin in the configuration. Add the `plugin` and `extra_config` entries in your configuration. Here's an example of `pucora.json`:

```json
{
  "version": 3,
  "plugin": {
    "pattern": ".so",
    "folder": "./pucora-server-example/"
  },
  "endpoints": [
    {
      "endpoint": "/test/{id}",
      "backend": [
        {
          "host": [
            "http://localhost:8080"
          ],
          "url_pattern": "/__health"
        }
      ]
    }
  ],
  "extra_config": {
    "plugin/http-server": {
      "name": ["pucora-server-example"],
      "pucora-server-example": {
        "path": "/hijack-me"
      }
    }
  }
}
```

Start the server with `pucora run -dc pucora.json`. When you run the server, the expected output (with `DEBUG` log level) is:

    yyyy/mm/dd hh:mm:ss PUCORA ERROR: [SERVICE: Logging] Unable to create the logger: getting the extra config for the pucora-gologging module
    yyyy/mm/dd hh:mm:ss PUCORA DEBUG: [SERVICE: Plugin Loader] Starting loading process
    yyyy/mm/dd hh:mm:ss PUCORA DEBUG: [SERVICE: Executor Plugin] plugin #0 (pucora-server-example/pucora-server-example.so): plugin: symbol ClientRegisterer not found in plugin pucora-server-example
    yyyy/mm/dd hh:mm:ss PUCORA DEBUG: [PLUGIN: pucora-server-example] Logger loaded
    yyyy/mm/dd hh:mm:ss PUCORA INFO: [SERVICE: Handler Plugin] Total plugins loaded: 1
    yyyy/mm/dd hh:mm:ss PUCORA DEBUG: [SERVICE: Modifier Plugin] plugin #0 (pucora-server-example/pucora-server-example.so): plugin: symbol ModifierRegisterer not found in plugin pucora-server-example
    yyyy/mm/dd hh:mm:ss PUCORA DEBUG: [SERVICE: Plugin Loader] Loading process completed
    yyyy/mm/dd hh:mm:ss PUCORA INFO: Starting the Pucora instance
    yyyy/mm/dd hh:mm:ss PUCORA DEBUG: [ENDPOINT: /test/:id] Building the proxy pipe
    yyyy/mm/dd hh:mm:ss PUCORA DEBUG: [BACKEND: /__health] Building the backend pipe
    yyyy/mm/dd hh:mm:ss PUCORA DEBUG: [ENDPOINT: /test/:id] Building the http handler
    yyyy/mm/dd hh:mm:ss PUCORA DEBUG: [ENDPOINT: /test/:id][JWTSigner] Signer disabled
    yyyy/mm/dd hh:mm:ss PUCORA INFO: [ENDPOINT: /test/:id][JWTValidator] Validator disabled for this endpoint
    yyyy/mm/dd hh:mm:ss PUCORA INFO: [SERVICE: Gin] Listening on port: 8080
    yyyy/mm/dd hh:mm:ss PUCORA DEBUG: The plugin is now hijacking the path /hijack-me
    yyyy/mm/dd hh:mm:ss PUCORA DEBUG: [PLUGIN: Server] Injecting plugin pucora-server-example

    ...

Let's take a closer look at the log. First, notice that the plugin tried registering itself for each plugin type (`[SERVICE: Executor Plugin]`, `[SERVICE: Handler Plugin]`, and `[SERVICE: Modifier Plugin]`), but we are only building a Handler Plugin in this case.

As we are implementing only one of the types, the other two types will fail to load (`symbol not found`). The logline is expected and is not an error but just an informational `DEBUG` message.

The essential lines are:
- `[PLUGIN: pucora-server-example] Logger loaded` printed by the plugin logger we introduced in our code telling us that the plugin is loaded
- The `[SERVICE: Handler Plugin] Total plugins loaded: 1` telling us there is one type of plugin for this type
- `[PLUGIN: Server] Injecting plugin pucora-server-example` telling us that the plugin is loaded AND injected by the configuration.

If you see these lines, you did great! Your plugin is working.

To test the plugin, request an endpoint. If you request a path not declared in the configuration like `/__health` the plugin will do nothing about it, and will delegate the request to the router to continue its execution. If you request to `/hijack-me` then the plugin will respond itself with the content `Hello, /`



**Delegate the request**

```bash
curl http://localhost:8080/__health
{"agents":{},"now":"2022-06-14 16:53:41.845285857 +0200 CEST m=+459.332136249","status":"ok"}%
```




**Hijack the request**

```bash
curl http://localhost:8080/hijack-me
Hello, "/hijack-me"
```


The plugin is now working.