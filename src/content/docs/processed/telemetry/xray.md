[AWS X-Ray](https://aws.amazon.com/xray/) is a service offered by Amazon that provides an end-to-end view of requests as they travel through your application, and shows a map of your application’s underlying components.

The Opencensus exporter allows you export data to AWS X-Ray. Enabling it only requires you to add the `xray` exporter in the [opencensus module](/docs/telemetry/opencensus/).

> **Consider switching to OpenTelemetry**
>
> The [AWS Distro for OpenTelemetry](https://aws-otel.github.io/) Collector (ADOT Collector) is an AWS supported version of the upstream OpenTelemetry Collector and is distributed by Amazon. It enables users to send telemetry data to AWS CloudWatch Metrics, Traces, and Logs backends as well as the other supported backends. See how to [configure OpenTelemetry](/docs/telemetry/opentelemetry/)

The following configuration snippet sends data to your X-Ray:

```json
{
  "extra_config": {
    "telemetry/opencensus": {
      "sample_rate": 100,
      "reporting_period": 0,
      "exporters": {
        "xray": {
          "version": "latest",
          "region": "eu-west-1",
          "use_env": false,
          "access_key_id": "myaccesskey",
          "secret_access_key": "mysecretkey"
        }
      }
    }
  }
}
```
As with all [OpenCensus exporters](/docs/telemetry/opencensus/), you can add optional settings in the `telemetry/opencensus` level:



> **Schema reference:** `telemetry/opencensus.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).



Then, the `exporters` key must contain an `xray` entry with the following properties:



> **Schema reference:** `telemetry/opencensus.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).



See also the [additional settings](/docs/telemetry/opencensus/) of the Opencensus module that can be declared.