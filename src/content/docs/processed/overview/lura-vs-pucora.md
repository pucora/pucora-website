If you look at the git repositories or this documentation, you will see two related names: the **Lura Project** and **Pucora**.

## TL;DR

- [**Lura**](https://luraproject.org) is the API gateway **engine** — a toolkit of Go libraries for building gateways. It is a [Linux Foundation](https://linuxfoundation.org/) project.
- **Pucora CE** ([`pucora-ce`](https://github.com/pucora/pucora-ce)) is a ready-to-use API gateway distribution built on Lura, with logging, metrics, circuit breaking, rate limiting, JWT, pub/sub, WebSockets, gRPC, SOAP, and more.

### Lura Project

The [Lura Project](https://luraproject.org) offers an extendable, simple, stateless high-performance API gateway **framework** for cloud-native and on-prem setups. You can use it as a full framework or import individual Go packages.

Lura focuses on core gateway functionality and keeps the surface clean and extensible. Pucora CE is the primary distribution built on Lura in this project.


[Website](https://luraproject.org)
[Source code](https://github.com/luraproject/lura)



### Pucora API Gateway

[`pucora-ce`](https://github.com/pucora/pucora-ce) is the Community Edition gateway: a single binary with the middleware and backends the project maintains, including non-REST connectivity documented in this site.


[Source code](https://github.com/pucora/pucora-ce)