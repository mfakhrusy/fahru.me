Axum demo
============

Axum: ergonomic and modular web framework built with Tokio, Tower, and Hyper.

* Route requests to handlers with a macro free API.
* Declaratively parse requests using extractors.
* Simple and predictable error handling model.
* Generate responses with minimal boilerplate.
* Take full advantage of the tower and tower-http ecosystem of middleware, services, and utilities.

Hyper: A fast and correct HTTP implementation for Rust.

* HTTP/1 and HTTP/2
* Asynchronous design
* Leading in performance
* Tested and correct
* Extensive production use
* Client and Server APIs

tower-http: a collection of HTTP specific middleware and utilities built with Tower's Service trait.

* Trace: Easily add high level tracing/logging to your application. Supports determining success or failure via status codes as well as gRPC specific headers. Has great defaults but also supports deep customization.
* Compression and Decompression: Automatically compress or decompress response bodies. This goes really well with serving static files using ServeDir.
* FollowRedirect: Automatically follow redirection responses.

http: a general purpose library of common HTTP types, for examples `http::{Request, Response, StatusCode}` 

# Vocabulary

* Handler: an async function that accepts zero or more “extractors” as arguments and returns something that can be converted into a response.
* Routing: between handlers and request paths
* Extractor: a type that implements FromRequest. Extractors are how you pick apart the incoming request to get the parts your handler needs.
* Building responses: anything that implements IntoResponse can be returned from a handler
* Middleware: used to decorate the application, providing additional functionality

# Demo cases

* static assets handle
* index page
* form submit: login
* json submit: REST API
* json output: struct and json!() macro
* query:  `/search?q=java`
* Path variables/params `/user/:id`
* 404 handler:  Separate net("/") and handler_404() 

# Docker support
Refer from  [Packaging a Rust web service using Docker](https://blog.logrocket.com/packaging-a-rust-web-service-using-docker/) 

```bash
docker build -t axum-demo .
docker run -p 3000:3000 axum-demo
```

Or you can refer https://kerkour.com/blog/rust-small-docker-image/

# References

* Axum home: https://github.com/tokio-rs/axum
* Axum examples: https://github.com/tokio-rs/axum/tree/main/examples
* Announcing Axum: https://tokio.rs/blog/2021-07-announcing-axum
* How to use “Type safe routing” of axum: https://medium.com/mixi-developers/how-to-use-type-safe-routing-of-axum-c06c1b1b1ab
* How to deploy a Rust Web Server to Heroku using Axum, Docker, and Github Actions: https://fbzga.medium.com/how-to-deploy-a-rust-web-server-to-heroku-using-axum-docker-and-github-actions-6cddb442ea7e
* Deploy a Rust web server to Heroku with axum, Tokio, and GitHub Actions: https://blog.logrocket.com/deploy-rust-web-server-heroku-axum-tokio-github-actions/
* Using Axum Framework To Create REST API: 
   - https://medium.com/intelliconnect-engineering/using-axum-framework-to-create-rest-api-part-1-7d434d2c5de4
   - https://medium.com/intelliconnect-engineering/using-axum-framework-to-create-rest-api-part-ii-4eba129c196b

