Pucora supports sending structured events in GELF format to your Graylog Cluster thanks to the [pucora-gelf](https://github.com/pucora/pucora-gelf) integration.

The setup of GELF is straightforward and requires to add **two components** in the configuration:

- `telemetry/logging` to capture the logs
- `telemetry/gelf` to format the logs

The configuration you need to add is this, and explained below:

```json
{
    "extra_config": {
      "telemetry/gelf": {
        "address": "myGraylogInstance:12201",
        "enable_tcp": false
      },
      "telemetry/logging": {
          "level": "INFO",
          "prefix": "[PUCORA]",
          "syslog": false,
          "stdout": false
      }
    }
}
```

The GELF configuration parameters for `telemetry/gelf` are:



> **Schema reference:** `telemetry/gelf.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).



In addition, you must also add the `telemetry/logging`:



> **Schema reference:** `telemetry/logging.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).