In addition to checking the syntax of your Pucora configuration and make sure that the gateway can start, you can run **integration tests** to make sure that the gateway returns the expected content from the consumed backends. to make sure all endpoints are properly connected and that they reply with the expected content. To do that, you can use the library that Pucora is relying on to run its **integration tests**, and complement the unit testing battery.

Pucora comes with a small program that lets you define a folder with tests and execute them all at once, reporting any failures it found.

The way this library works is quite simple. You create a folder with all the different specs you want to tested, one per file. Each file is a `.json` file with two keys:

- `in`: The parameters used to build the request to a running Pucora with your configuration
	- `method`: The request method
	- `url`: The full URL to the endpoint you want to test
	- `header`: An optional map of header to include in the request
 	- `body`: An optional payload you can send in the request as data
- `out`: The expected response from the gateway
	- `status_code` (*integer*): The expected status code
	- `body`: The returned body by the response as a string, or as JSON object.
	- `header`: Any header included in the response. When the value is empty it means that you don't expect that header.

For instance:

```json
{
	"in": {
		"method": "GET",
		"url": "http://localhost:8080/detail_error",
		"header": {
			"X-Header": "something"
		}
	},
	"out": {
		"status_code": 200,
		"body": {
          "message": "pong"
        },
		"header": {
			"content-type": ["application/json; charset=utf-8"],
			"Cache-Control": [""],
			"X-Pucora-Completed": ["true"]
		}
	}
}
```

In the example above, the response must contain the `content-type` and `X-Pucora-Completed` with the specified values, and the `Cache-Control` cannot be present.

You must build the go binary that allows you to run the tests.

## Installing the integration tests tool
To install the integration tests you only need to run the following lines in any machine or Docker container with go installed:



**Installing the integration tool**

```bash
go install github.com/pucora/pucora-ce/v2/cmd/pucora-integration@v
```


After this you should have a new binary `pucora-integration` in your PATH. To use it you will to execute:



**Term**

```bash
pucora-integration -pucora_bin_path ./pucora \
-pucora_config_path ./pucora.json \
-pucora_specs_path ./specs
```


The three parameters of the binary are:

- `-pucora_bin_path`: The path to the Pucora binary. Defaults to `./pucora`, but if Pucora is in your PATH then you can use `pucora`.
- `-pucora_config_path`: The path to the Pucora configuration file that contains all endpoints you want to test.
- `-pucora_specs_path`: The path to the folder containing all your specifications. These are all the tests that you want to run against Pucora and check its output.


[Integration tests](https://github.com/pucora/pucora-ce/tree/master/tests)
[Fixtures](https://github.com/pucora/pucora-ce/tree/master/tests/fixtures)