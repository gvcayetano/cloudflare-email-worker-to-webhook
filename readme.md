# Description

A worker script that posts/forwards all emails to a webhook.

At the time of writing, the Node.js version used was:

```
v8.12.0
```

# Prerequisites

- Node.js v8.12.0 or later
- npm (comes with Node.js)
- A Cloudflare account
- A webhook URL that can accept `POST` requests

# Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Rename `wrangler.toml.sample` to `wrangler.toml`.
3. Configure the following in `wrangler.toml`:
   - **name** – The name of your email worker on Cloudflare.
   - **WEBHOOK_URL** – The URL of your webhook that accepts a `POST` request with the following payload:
     - `to`
     - `from`
     - `headers`
     - `htmlBody`

# Usage

Once deployed, the worker will forward incoming emails to the specified webhook URL. The webhook should be prepared to handle a `POST` request with the provided payload structure.

Example payload:

```json
{
  "to": "recipient@example.com",
  "from": "sender@example.com",
  "headers": {
    "subject": "Test Email"
  },
  "htmlBody": "<p>This is a test email.</p>"
}
```

# Debugging (Windows)
1. Make sure `.dev.vars` has `DEBUG_MODE` set to `true` and `WEBHOOK_URL` pointing to your receiving endpoint.
1. Run `debug.bat`.
1. Run `sendEmail.bat`.

# Deployment (Windows)

1. Run `login.bat`.
2. Run `deploy.bat`.

# License

This project is licensed under the MIT License. See `LICENSE` for details.
