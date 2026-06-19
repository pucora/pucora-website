The Pucora exporter to [Jaeger](https://www.jaegertracing.io/) allows you to submit spans to an OpenTelemetry Collector (HTTP or gRPC) automatically.

Jaeger is an open-source, end-to-end distributed tracing system that allows you to monitor and troubleshoot transactions in complex distributed systems. Use Jaeger when you want to see the complete flow of a user request through Pucora and its connected services.

## Jaeger configuration
To add Jaeger, configure a new exporter to the [OpenTelemetry settings](/docs/telemetry/opentelemetry/). For instance:

```json
{
    "version": 3,
    "extra_config": {
        "telemetry/opentelemetry": {
            "service_name": "my_pucora_service",
            "metric_reporting_period": 1,
            "trace_sample_rate": 0.15,
            "layers": {
                "global": {
                    "report_headers": true
                },
                "proxy": {
                    "report_headers": true
                },
                "backend": {
                    "metrics": {
                        "disable_stage": true
                    },
                    "traces": {
                        "disable_stage": false,
                        "round_trip": true,
                        "read_payload": true,
                        "detailed_connection": true,
                        "report_headers": true
                    }
                }
            },
            "exporters": {
                "otlp": [
                    {
                        "name": "local_jaeger",
                        "host": "jaeger",
                        "port": 4317,
                        "use_http": false,
                        "disable_metrics": true
                    }
                ]
            }
        }
    }
}
```
The fields relative to the exporter are:



> **Schema reference:** `telemetry/opentelemetry.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).



But as you can see there is a `layers` attribute in the example configuration that defines settings for all exporters (not only Jaeger). See the [layers options](/docs/telemetry/opentelemetry/#layers).

Also notice that port `4317` and `"use_http": false` are set, meaning that gRPC communication is used. Change to `4318` and the flag to `true` for HTTP communication.

## Jaeger demo environment
You can test this setup by running the **All in One** official Jaeger image and opening the necessary ports. For instance:
```yaml
version: "3"
services:
  pucora:
    image: pucora/pucora-ce:latest:
    volumes:
      - "./:/etc/pucora"
    ports:
      - "8080:8080"
  jaeger:
    image: jaegertracing/all-in-one:1.54
    environment:
      COLLECTOR_ZIPKIN_HOST_PORT: ":9411"
    ports:
      - "5778:5778" # serve configs
      - "16686:16686" # serve frontend UI
      - "4317:4317"   # otlp grpc: we remap this to be able to run other envs
      - "4318:4318"   # otlp http: we remap this to be able to run other envs
    deploy:
      resources:
        limits:
          memory: 4096M # Adjust according to your setup
```