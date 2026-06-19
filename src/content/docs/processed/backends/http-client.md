The HTTP client namespace allows you to set the behavior of the HTTP connections between Pucora and your backend service.

### Send the payload on 307 and 308 redirects
Pucora does not duplicate the body of the request when following a redirection because automatically doing it would affect the performance of all requests. In the unusual cases where your backend responds with a `307 Temporary Redirect` or a `308 Permanent Redirect`, enable the following flag to resend the original payload to the final redirected service:



> **Schema reference:** `backend/http_client.json` — see [pucora-schema](https://github.com/pucora/pucora-schema).



Here is a configuration example:

```json
{
  "version": 3,
  "$schema": "https://www.pucora.io/schema/v2.0/pucora.json",
  "endpoints": [
    {
      "endpoint": "/foo",
      "backend": [
        {
          "host": ["https://api"],
          "url_pattern": "/url-that-will-redirect-with-307",
          "extra_config": {
            "backend/http/client": {
              "send_body_on_redirect": true
            }
          }
        }
      ]
    }
  ]
}
```

## Avoid HTTP redirection and other options
To prevent Pucora from following redirects, use specific TLS options, and utilize intermediate proxies and other options, refer to the HTTP Client options in the Pucora.