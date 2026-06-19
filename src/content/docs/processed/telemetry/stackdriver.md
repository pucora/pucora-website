[Google Cloud's Operation Suite](https://cloud.google.com/products/operations) (formerly [Stackdriver](https://cloud.google.com/stackdriver/)) aggregates metrics, logs, and events from infrastructure, giving developers and operators a rich set of observable signals that speed root-cause analysis and reduce mean time to resolution (MTTR).

The Opencensus exporter allows you to export **metrics and traces** to Google Cloud. Enabling it only requires you to add the `stackdriver` exporter in the [opencensus module](/docs/telemetry/opencensus/).

The following configuration snippet sends the data:

```json
{
  "extra_config": {
    "telemetry/opencensus": {
      "sample_rate": 100,
      "reporting_period": 60,
      "enabled_layers": {
        "backend": true,
        "router": true,
        "pipe": true
      },
      "exporters": {
        "stackdriver": {
          "project_id": "my-pucora-project",
          "metric_prefix": "pucora",
          "default_labels": {
            "env": "production"
          }
        }
      }
    }
  }
}
```

As with all [OpenCensus exporters](/docs/telemetry/opencensus/), you can add optional settings in the `telemetry/opencensus` level:



> **Schema reference:** `telemetry/opencensus.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).



Then, the `exporters` key must contain an `stackdriver` entry with the following properties:



> **Schema reference:** `telemetry/opencensus.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).



See also the [additional settings](/docs/telemetry/opencensus/) of the Opencensus module that can be declared.

> **Google does not accept low reporting periods**
>
> The number of **seconds** passing between reports in `reporting_period` must be **`60` or greater**, otherwise, Google will reject the connection.

## Authentication to Google Cloud
The exporter searches for the **Application Default Credentials**. It looks for credentials in the following places, preferring the first location found:

1. A JSON file whose path is specified by the `GOOGLE_APPLICATION_CREDENTIALS` environment variable.
2. A JSON file in a location known to the `gcloud` command-line tool (e.g.: `$HOME/.config/gcloud/application_default_credentials.json`).
3. On Google Compute Engine and Google App Engine flexible environment, it fetches credentials from the metadata server.