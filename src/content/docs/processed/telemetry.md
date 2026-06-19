Pucora's **no lock-in philosophy** emphasizes flexibility and interoperability, ensuring technology-specific dependencies don't constrain you. Giving you choices for observability and networking tools is key to success in a distributed microservices architecture.

Our [OpenTelemetry](/docs/telemetry/opentelemetry/) integration and its previous predecessors [OpenCensus](/docs/telemetry/opencensus/), and the [Metrics API](/docs/telemetry/extended-metrics/), are part of this effort. Our components provide:

- Ways to export data to detect root causes of problems.
- Monitoring and details of the different distributed transactions.
- Performance and latency optimization in the systems of your choice.
- The flexibility to use the monitoring system that you have chosen, and not one that you are locked-in

**OpenTelemetry** presents a unified, open-source framework for collecting and managing telemetry data across distributed systems, such as traces and metrics. It offers **vendor neutrality**,  **simplifies instrumentation**, and **avoids lock-in** with specific monitoring platforms. You can choose between **over twenty different providers**. [Add OTEL to your configuration](/docs/telemetry/opentelemetry/).

**OpenCensus** is the previous component which has provided reliable service for over six years for traces and metrics, and now its development is frozen in favour of OpenTelemetry. You can still use [OpenCensus telemetry](/docs/telemetry/opencensus/), although we recommend you to plan a transition to OpenTelemetry.

The **Metrics API** and its native exporter to InfluxDB are in a similar situation. It was our richest exporter of metrics data until the OpenTelemetry release, and while it still works, its development has also frozen. [See the Metrics API](/docs/telemetry/extended-metrics/)

If starting with a new project, choose an OpenTelemetry integration for metrics and traces.

## OpenTelemetry integrations
As OpenTelemetry is **an open standard**, any provider adopting it using the wire protocol will automatically be compatible with Pucora. More than 50 vendors natively support it.

So the question of *does Pucora support provider X?* can be answered with another question: *Does your provider offer an OpenTelemetry integration?*.

As providers and software makers make an ongoing effort to adopt OpenTelemetry, you can find an extensive list of systems, SaaS or on-premise, that are on this path, and more are coming (see [vendors who natively support OpenTelemetry](https://opentelemetry.io/ecosystem/vendors/)).

If you work with Pucora and a piece of software that is not in the list below, please add it!

### Self-hosted systems using OTEL
When you want to have complete control of your metrics and traces, this is a list of software you can install in your infrastructure:

- **Prometheus**: An open-source system monitoring and alerting toolkit.
- **Jaeger**: An open-source, self-hosted solution for distributed tracing.
- **Elastic APM**: Part of the Elastic Stack, can be self-hosted for full control over data and infrastructure.
- **Grafana Tempo**: Integrates with Grafana can be self-hosted for tracing data.

### SaaS systems using OTEL
If you want to use a third-party SaaS, here is a list of a few APM systems that vary in their specific offerings, such as AI capabilities, ease of integration, visualization tools, and support for different programming languages and frameworks:

- **New Relic**: Offers comprehensive monitoring with native support for OpenTelemetry.
- **Datadog**: Provides extensive analytics and monitoring, supporting OpenTelemetry protocols.
- **Dynatrace**: Known for AI-powered analytics and robust OpenTelemetry integration.
- **Splunk APM (formerly SignalFx)**: Offers real-time analytics and visualization compatible with OpenTelemetry.
- **AppDynamics (Cisco)**: Supports OpenTelemetry, providing performance analysis and proactive alerting.
- **Elastic APM**: Part of the Elastic Stack integrates well with OpenTelemetry.
- **Instana**: Offers automated APM for microservices with OpenTelemetry support.
- **Google Cloud’s operations suite (formerly Stackdriver)**: Provides an integrated suite for monitoring, logging, and diagnostics, compatible with OpenTelemetry.
- **AWS X-Ray**: Supports OpenTelemetry for applications running in AWS environments.
- **Azure Monitor**: Fully compatible with OpenTelemetry for monitoring applications on Azure.
- **Jaeger**: An open-source platform for distributed tracing that supports OpenTelemetry.
- **Lightstep**: Delivers detailed insights and is compatible with the OpenTelemetry protocol.
- **Honeycomb.io**: Emphasizes understanding production systems and supports OpenTelemetry.
- **Sumo Logic**: Offers cloud-native solutions with OpenTelemetry integration.
- **SolarWinds AppOptics**: Combines APM features with cloud monitoring, supporting OpenTelemetry.
- **LogicMonitor**: Known for its automated monitoring solutions that are compatible with OpenTelemetry.
- **Scout APM**: A developer-centric monitoring tool that supports OpenTelemetry.
- **Rollbar**: Focuses on real-time error tracking and debugging with OpenTelemetry support.
- **Wavefront by VMware**: A streaming analytics platform integrating with OpenTelemetry.

The adoption of OpenTelemetry by these platforms indicates a strong industry shift towards standardized, open-source observability solutions. **You should test the ones you need on Pucora** and ensure they deliver what you seek; from Pucora, we are unfamiliar with every vendor out there.


[Configure OpenTelemetry](/docs/telemetry/opentelemetry/)