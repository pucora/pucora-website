Pucora exposes **gRPC client** and **gRPC server** integration with unary RPC support. Catalog services use compiled `.pb` descriptor files.

Implemented by [`pucora-grpc`](https://github.com/pucora/pucora-grpc) via:

- `extra_config.grpc` — service catalog and optional gRPC server
- `extra_config.backend/grpc` — gRPC upstream backends

## Catalog setup

Generate `.pb` files from `.proto`:

```bash
protoc --descriptor_set_out=flights.pb flights.proto
```

Service-level config:

```json
{
  "extra_config": {
    "grpc": {
      "catalog": ["./grpc/flights.pb", "./grpc/definitions"]
    }
  }
}
```

## Feature overview

| Capability | Doc | Namespace |
|------------|-----|-----------|
| REST → gRPC upstream calls | [gRPC client](/docs/backends/grpc/) | `backend/grpc` |
| Expose gRPC on gateway port | [gRPC server](/docs/grpc/server/) | `grpc.server` |
| Mixed HTTP + gRPC endpoints | Both docs | Combined config |

## Rules

| Rule | Value |
|------|-------|
| `host` (client backend) | `host:port` only (no `http://`) |
| `url_pattern` | `/package.Service/Method` |
| Streaming | Not supported in v1 |
| Catalog | Requires `.pb` files at runtime |

## Local examples

From the Pucora CE repository:

| Config | Make target | Smoke test |
|--------|-------------|------------|
| `pucora.json` | `grpc-compose-test` | REST `/flights` |
| `pucora-server.json` | server variant | `grpcurl` FindFlight |
| `pucora-mixed.json` | mixed variant | REST + `grpcurl` |
| `pucora-jwt.json` | JWT variant | auth required |

```bash
make test-grpc
make grpc-compose-test
```

See [examples/grpc](https://github.com/pucora/pucora-ce/tree/main/examples/grpc).

## Limitations

- Unary RPC only (no streaming)
- Catalog requires `.pb` files (not raw `.proto` at runtime)
- Arrays of objects cannot be filled via query strings

## Related

- [Pucora Configurator](/docs/configuration/configurator/) — `grpc-client` preset
- [gRPC client backend](/docs/backends/grpc/)
- [gRPC server](/docs/grpc/server/)