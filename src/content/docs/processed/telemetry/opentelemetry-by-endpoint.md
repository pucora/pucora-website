The OpenTelemetry configuration is declared [at the service level](/docs/telemetry/opentelemetry/), but you can override metrics and traces per endpoint and per backend as follows.

## Endpoint override of metrics and traces
The following example overrides properties that could be declared at the service level.

```json
{
    "endpoints": [
        {
            "endpoint": "/example",
            "backend": [
                {
                    "host": [
                        "example.com"
                    ],
                    "url_pattern": "/example"
                }
            ],
            "extra_config": {
                "telemetry/opentelemetry": {
                    "proxy": {
                        "disable_metrics": false,
                        "disable_traces": false,
                        "report_headers": true,
                        "traces_static_attributes": [
                          {
                            "key": "owner",
                            "value": "team-charlie"
                          }
                        ],
                        "metrics_static_attributes": [
                          {
                            "key": "owner",
                            "value": "team-charlie"
                          }
                        ]
                    }
                }
            }
        }
    ]
}
```

The full list of options is:



> **Schema reference:** `telemetry/opentelemetry-endpoint.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).



In the Pucora you have more override options, like override entirely the exporter you want to use.

## Backend override of metrics and traces
For instance, you have a specific backend that is adding noise to your dashboards and you'd like to disable all layers:

```json
{
    "backend": [
        {
            "extra_config": {
                "telemetry/opentelemetry": {
                    "proxy": {
                        "disable_metrics": true,
                        "disable_traces": true
                    },
                    "backend": {
                        "metrics": {
                            "disable_stage": true
                        },
                        "traces": {
                            "disable_stage": true
                        }
                    }
                }
            },
            "url_pattern": "/noise",
            "host": [
                "example.com"
            ]
        }
    ]
}
```
These are the options:



> **Schema reference:** `telemetry/opentelemetry-backend.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).