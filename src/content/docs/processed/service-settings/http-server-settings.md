Pucora starts an HTTP server to offer the API Gateway server. You can personalize some of the settings used to start the service and also override the default settings of the underlying Go [standard library](https://pkg.go.dev/net/http#Server).

If you want to customize any of the settings below, they must be written at the top level of the configuration.



> **Schema reference:** `_root.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).



## Override settings using environment vars
When you declare in the configuration file any of the HTTP server settings declared above, you can [override its value through environment variables](/docs/configuration/environment-vars/) when starting the server.

All the environment variables have the same name are the same settings above in uppercase and with the `PUCORA_` prefix. For instance, looking at the list of settings above, you could override:

- `PUCORA_PORT`
- `PUCORA_READ_TIMEOUT`
- `PUCORA_READ_HEADER_TIMEOUT`
- `PUCORA_WRITE_TIMEOUT`
- `PUCORA_IDLE_TIMEOUT`
- `PUCORA_USE_H2C`
- etc...

You can start Pucora with the desired variables to override what you have in the configuration:



**Term**

```bash
PUCORA_PORT=8000 PUCORA_READ_TIMEOUT="1s" pucora run -c pucora.json
```