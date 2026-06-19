The AMQP driver for **Async agents** allows you to have Pucora consuming AMQP queues autonomously. Routines listening to AMQP queues will react by themselves to new events and push data to your backends.

This driver is different from the [AMQP backend consumer](/docs/backends/amqp-consumer/). As opposed to endpoints, async agents do not require users to request something to trigger an action. Instead, the agents connect to the queue and fire an action when an event is delivered.

## Async/AMQP Driver Configuration
The AMQP driver has to be placed inside the `extra_config` of the [async component](/docs/async/) and allows you connect to an AMQP queue (e.g: RabbitMQ). The settings are as follows:

```json
{
    "async/amqp": {
        "host": "amqp://guest:guest@localhost:5672/",
        "name": "pucora",
        "exchange": "foo",
        "durable": true,
        "delete": false,
        "exclusive": false,
        "no_wait": true,
        "prefetch_count": 5,
        "auto_ack": false,
        "no_local": true
    }
}
```



> **Schema reference:** `async/amqp.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).