[Zipkin](https://zipkin.io/) is a distributed tracing system. It helps gather timing data needed to troubleshoot latency problems in service architectures.

The Opencensus exporter allows you export data to Zipkin. Enabling it only requires you to add the `zipkin` exporter in the [opencensus module](/docs/telemetry/opencensus/).

The following configuration snippet sends data to your Zipkin:
```json
{
  "version": 3,
  "extra_config": {
    "telemetry/opencensus": {
      "sample_rate": 100,
      "reporting_period": 0,
      "exporters": {
        "zipkin": {
          "collector_url": "http://192.168.99.100:9411/api/v2/spans",
          "service_name": "pucora"
        }
      }
    }
  }
}
```

As with all [OpenCensus exporters](/docs/telemetry/opencensus/), you can add optional settings in the `telemetry/opencensus` level:



> **Schema reference:** `telemetry/opencensus.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).



Then, the `exporters` key must contain an `zipkin` entry with the following properties:



> **Schema reference:** `telemetry/opencensus.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).