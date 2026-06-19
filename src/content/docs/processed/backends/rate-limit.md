No matter what amount of activity the users generate at the router level, you can limit Pucora's connections to your backends. The configuration is similar to the [router's rate limit](/docs/endpoints/rate-limit/), but it's declared directly in the `backend` section instead of the `endpoint`.

The limit applies **per defined backend entry** and does not consider the activity other backends generate. Each `backend` entry handles its counters and does not share them with different backends or endpoints.

The proxy rate limit is defined in the `pucora.json` configuration file as follows:


```json
{
    "endpoint": "/products/{cat_id}",
    "backend": [{
        "host": ["http://some.api.com/"],
        "url_pattern": "/catalog/category/{cat_id}.rss",
        "encoding": "rss",
        "extra_config": {
            "qos/ratelimit/proxy": {
                "max_rate": 0.5,
                "every": "1s",
                "capacity": 1
            }
        }
    }]
}
```


These are the parameters you can set:



> **Schema reference:** `qos/ratelimit/proxy.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).



## Comparison with router rate limit
In a nutshell:

- The [router rate limit](/docs/endpoints/rate-limit/) controls the requests users do to Pucora.
- The proxy rate limit controls Pucora's requests to your services.

You don't have to choose one or the other; you can mix the different types as they cover additional use cases.