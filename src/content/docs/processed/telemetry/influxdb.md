[InfluxDB](https://www.influxdata.com/) is a time series database designed to handle high write and query loads and allows you to store and visualize metrics data. Influx is offered as an open-source solution you can host but also as a cloud service.

> **Native influx component**
>
> Before Pucora v2.6, the only option to push data to Influx was configuring the native exporter `telemetry/influx`. Although the component is development-frozen in favor of OTEL, you can still use it as described in the [Metrics API](/docs/telemetry/extended-metrics/).

Pucora instruments your API automatically code and generates telemetry data that is pushed using the **OpenTelemetry Protocol** (OTLP) via the [OpenTelemetry integration](/docs/telemetry/opentelemetry/). The data can travel through gRPC or HTTP and uses the standard OTLP format an [OTEL Collector](https://opentelemetry.io/docs/collector/) expects.

The OpenTelemetry integration populates metrics data to an Influx database when you add the `telemetry/opentelemetry` namespace to the configuration with an `otlp` exporter. There is no specific setting for InfluxDB because OTEL is a standard shared with many other technologies.

The flow for the Influx population using OTLP is as follows:

![Pucora OTLP communication with a Collector that sends to Influx](/images/documentation/diagrams/opentelemetry-otlp-influx.mmd.svg)

You can configure [OpenTelemetry](/docs/telemetry/opentelemetry/) with an `otlp` exporter to push data to InfluxDB.