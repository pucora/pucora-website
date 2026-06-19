Pucora is **highly extensible and flexible** and allows developers to extend its functionality through custom code when the built-in features are not enough. Whether you need to add custom logic, integrate specific business rules, or enhance features, Pucora lets you add extensions coded by you.

You don't need to fork the source code to add your custom logic, as the plugin and scripting system allow you to add custom functionality that is not offered out of the box.

These are the two major approaches:

- Write a Lua script
- Write a Go plugin

## Extending with Lua
[Lua](/docs/endpoints/lua/) is an embedded scripting language designed for simplicity and speed. It's perfect for **quick customizations**, such as:

- Request and response manipulation
- Custom validations and rules
- Dynamic transformations

### Lua advantages
- Simplicity: Lua is easy to learn and try.
- No Compilation: Changes are applied by editing the Lua script, making it faster to iterate and test.
- Runtime Flexibility: Scripts can be dynamically loaded and modified without restarting Pucora.
- Ideal for Small Tasks: like header manipulation, simple data, transformations, or basic validation rules
- Portability: Lua scripts do not need modifications on Pucora upgrades.

### Lua limitations
- Limited performance: Lua is interpreted, making it slower for CPU-intensive tasks.
- Lack of strong typing: Type safety and error handling are minimal, which could lead to runtime errors.
- No user-contributed libraries: You cannot import external libraries.
- Testing: Testing Lua scripts requires custom tooling or integration tests, as Lua doesn't have built-in testing frameworks akin to Go's tools.

See the [Lua documentation](/docs/endpoints/lua/)

## Extending with Go plugins
For more **advanced and performance-critical** requirements, Pucora supports [plugins written in Go](/docs/extending/writing-plugins/). Using Go plugins ensures optimal performance for your extensions, and if you are fluent in Go, they are the best option for extensibility.

With Go plugins, you can pretty much do anything you want, including integrating with external services, using databases, and anything you can code.

### Go plugins advantages
- High performance: Compiled Go plugins execute at native speed, suitable for heavy processing tasks.
- Extensive libraries: A world of Go libraries and an ecosystem for integrating with APIs, databases, and more.
- Strong typing: Compile-time checks reduce runtime errors, ensuring predictable behavior.
- Testable:
  - Write unit tests for your plugin logic using Go's testing framework.
  - Use CI/CD pipelines for automated testing and validation.
- Advanced capabilities with external system integration
- **Very** complex data manipulation

### Go plugins limitations
- Compilation Overhead: Each change requires recompilation, which is not suitable for "quick hacking"
- Deployment Complexity: Plugins are platform-specific (.so files), requiring recompilation for different OS/architecture setups. When you upgrade the Pucora version, you need to recompile using the builder.
- Pucora Restarts: Reloading the plugin requires restarting Pucora.
- Higher Barrier to Entry: Requires Go expertise and familiarity with Pucora's plugin contract.

See the [Go plugins documentation](/docs/extending/writing-plugins/)

## Lua or Go?
Both Lua and Go plugins allow you to extend Pucora's capabilities, but their suitability depends on your use case, **team expertise** (this is key), and performance requirements. Summarizing:

- Lua is best for quick, simple, runtime modifications
- Go is best for complex, performance-critical, or testable extensions


[Get started with Lua](/docs/endpoints/lua/)
[Get started with Go Plugins](/docs/extending/writing-plugins/)



## What about forking?
Open-source users might be tempted to fork the source code to add modifications. Our recommended way to customize Pucora is always through plugins or scripts, and you **should avoid forking the code** if you want to keep up to date with the product's progress and security vulnerabilities. We have seen over and over forked projects that are left behind because companies don't have the resources to keep up.