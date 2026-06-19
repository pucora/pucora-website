The service discovery (`sd`) is an optional attribute of the `backend` section that enables Pucora to detect and locate services automatically on your enterprise network.

> **Related read**
>
> You might also want to read the [Load Balancer](/docs/throttling/load-balancing/) documentation

The chosen **service discovery strategy** determines how to retrieve (statically or dynamically) the final list of IPs, hostnames, or services pointing to your backends. If your host list is dynamic, you can use an external service discovery provider and let Pucora interact with it to get the hosts. If your host list is static (it doesn't change) or you use a service name or an external load balancer, you can use `static` resolution and directly use the values provided under `host[]`.

Pucora must be in a network that can reach any declared hosts. With more than one host, Pucora [load balances](/docs/throttling/load-balancing/) the connections to the hosts in the list.

## Service discovery configuration
The possible configurations and values for `sd` are:



> **Schema reference:** `backend.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).



## Static resolution
The `static` resolution is the default service discovery strategy. It implies that you write directly in the configuration the protocol plus the service name, hosts, or IPs you want to connect to.

The `static` resolution uses a **list** of hosts to **load balance** (in a Round Robin fashion) all servers in the list, and you should expect more or less an equivalent number of hits on each backend. However, if you use a **Kubernetes service**, then it load-balances itself so that you only need one entry.

> **Declaring hosts on Kubernetes**
>
> When the consumed hosts are behind a balancer or a service name, write a single entry in the array with that name.

To use static resolution, you don't need to declare anything other than the `host` list. However, you can add the `"sd": "static"` property in the backend configuration for a more explicit reading, as it is the default value when `sd` is not declared). Example:

```json
{
"backend": [
    {
        "url_pattern": "/some-url",
        "sd": "static",
        "host": [
            "http://my-service-01.api.com:9000",
            "http://my-service-02.api.com:9000"
        ]
    }
]
}
```

## DNS SRV Service Discovery (Kubernetes/Consul)
The `DNS SRV`([see RFC](https://datatracker.ietf.org/doc/html/rfc2782)) is a market standard used by systems such as **Kubernetes, Mesos, Haproxy, Nginx plus, AWS ECS, Linkerd**, and many more. An SRV entry is a custom DNS record that establishes connections between services. When Pucora needs to know the location of a specific service, it will search for a related SRV record.

The format of the `SRV` record is as follows:

    _service._proto.name. TTL IN SRV priority weight port target

**Example**. A service running on port `8000` with maximum priority (`0`) and a weight `5` ):

    _api._tcp.example.com. 86400 IN SRV 0 5 8000 foo.example.com.

> **Caching**
>
> The DNS-based service discovery caches entries for 30 seconds by default, use `dns_cache_ttl`to change it.

To integrate **Consul, Kubernetes, or any other `DNS SRV` compatible system** as the Service Discovery, you only need to set two keys:

- `"sd": "dns"`: To use dynamic host resolution using the service discovery strategy
- `"sd_scheme": "https"`: When the list of hosts provided by the service discovery is offered under HTTPS instead of plain HTTP
- `"host": []`: And entry with the service name providing the resolution (e.g., Consul address)

Add these keys in the `backend` section of your configuration. If there is another `host` key in the root level of the configuration, you don't need to declare it here if the value is the same.

For instance:

```json
{
    "backend": [
        {
            "url_pattern": "/foo",
            "sd": "dns",
            "sd_scheme": "https",
            "host": [
                "_https._tcp.my-application.default.svc.cluster.local"
            ],
            "disable_host_sanitize": true
        }
    ]
}
```
With the configuration above, Pucora will query every 30 seconds (default behavior) the `_https._tcp.my-application.default.svc.cluster.local` DNS and will apply to the internal balancer any weights and priorities returned by the DNS record.

## DNS Cache
The results returned by your Service Discovery are cached in memory, so Pucora does not constantly hammer on each request for the list of hosts. Nevertheless, you can change this time as per your needs, and you must place the following attribute in the root of the configuration for all services in the configuration to do so.

Even though this setting is global, each backend keeps a copy of the list returned by the SD and renews it actively in the background every TTL (even if there are no requests).

If, for whatever reason, any renewal of the TTL fails (e.g., the SD is down), the last successful list of hosts is used.

For unsafe values under one second, the default is used instead.



> **Schema reference:** `_root.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).



For instance:

```json
{
    "version": 3,
    "$schema": "https://www.pucora.io/schema/pucora.json",
    "dns_cache_ttl": "10s"
}
```

## How priority and weight affect balancing
When the Service Discovery answers with the list of hosts, **only the lower priority is taken**. For instance, if you have a response like this one:



**SRV response example**

```bash
dig _service._tcp.domain.com SRV +short
10 1 8000 service-1.domain.com.
10 2 8000 service-2.domain.com.
20 1 8000 service-3.domain.com.
```


Which can be read as two services with priority `10` and one with `20`, all using port `8000`.

With this configuration, Pucora removes `service-3` (prio `20`) from the balancing since two entries have lower priority (prio `10`).

In addition, the weight of `service-1` is `1`, and `service-2` is `2`, so the final list where Pucora will load-balance is: `["service-1:8000", "service-2:8000", "service-2:8000"]`