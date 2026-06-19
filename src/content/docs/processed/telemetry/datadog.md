[Datadog](https://www.datadoghq.com/) is a cloud monitoring and security platform for developers, IT operations teams, and businesses.

The [OpenTelemetry integration](/docs/telemetry/opentelemetry/) allows you to send **metrics and traces** to Datadog using their collector.

## Datadog configuration
Datadog uses the standard OTLP exporter, here is a configuration example:

```json
{
    "version": 3,
    "$schema": "https://www.pucora.io/schema/pucora.json",
    "host": [
        "http://localhost:8080"
    ],
    "debug_endpoint": true,
    "echo_endpoint": true,
    "extra_config": {
        "telemetry/opentelemetry": {
            "exporters": {
                "otlp": [
                    {
                        "use_http": false,
                        "port": 4317,
                        "host": "ddagent",
                        "name": "my_dd_exporter",
                        "disable_metrics": false,
                        "disable_traces": false
                    }
                ]
            },
            "trace_sample_rate": 1,
            "service_name": "pucora_dd_telemetry",
            "metric_reporting_period": 1
        }
    }
}
```

The important part of the configuration is the `otlp` exporter, which accepts the following fields:



> **Schema reference:** `telemetry/opentelemetry.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).



In addition, you can configure how the `layers` behave ([see all options](/docs/telemetry/opentelemetry/#layers)).

## Datadog agent
You must set your Datadog API key in the agent. The exporter communicates with the agent and is the agent the one reporting to Datadog.

Here's an example of how to run the Datadog agent together with Pucora in a docker compose file:

```yml
version: '3'
services:
  pucora:
    image: pucora/pucora-ce:latest:
    volumes:
      - "./:/etc/pucora"
    command: ["run", "-c", "pucora.json"]
    ports:
      - "8080:8080"
  datadog:
    image: gcr.io/datadoghq/agent:7
    pid: host
    environment:
     - DD_API_KEY=XXXXXXXXXXXXXXX
     - DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT=0.0.0.0:4317
     - DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT=0.0.0.0:4318
     - DD_SITE=datadoghq.com
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
```

Notice that we are naming the service `ddagent` in Docker compose, and this matches our `host` field in the configuration.

## Migrating from OpenCensus
Prior to v2.6, telemetry sent to Datadog used the OpenCensus exporter. Enabling required adding the `datadog` exporter in the [opencensus module](/docs/telemetry/opencensus/), and the configurations looked like this:
```json
{
      "version": 3,
      "extra_config": {
        "telemetry/opencensus": {
          "sample_rate": 100,
          "reporting_period": 0,
          "exporters": {
            "datadog": {
              "tags": [
                "gw"
              ],
              "global_tags": {
                "env": "prod"
              },
              "disable_count_per_buckets": true,
              "trace_address": "localhost:8126",
              "stats_address": "localhost:8125",
              "namespace": "pucora",
              "service": "gateway"
            }
          }
        }
      }
}
```
You can migrate to OpenTelemetry doing the following changes:

- Rename `telemetry/opencensus` to `telemetry/opentelemetry`.
- `sample_rate` -> Delete this field
- `reporting_period` -> Rename to `metric_reporting_period`
- `datadog` -> Rename to `otlp`, and add an array surrounding the object, so it becomes `"otlp": [{...}]`
- `namespace` -> Rename to `name`
- `tag_host`, `tag_path`,`tag_method`,`tag_statuscode` -> Delete them