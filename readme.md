# Description

A worker script that posts/forwards all emails to a webhook.

At the time of writing, the Node.js version used was:

```
v22.16.0
```

# Prerequisites

- Node.js (using a node version manager is recommended)
- A Cloudflare account
- A webhook URL that can accept `POST` requests

# Setup

1. Install dependencies:
  ```
  npm install
  ```
2. Copy `wrangler.toml.sample` and rename it to `wrangler.toml`.
3. Configure the following in `wrangler.toml`:
  - **name** – The name of your email worker on Cloudflare.
  - **WEBHOOK_URL** – The URL of your webhook that accepts a `POST` request 
    with the following payload:
    - `to`
    - `from`
    - `subject`
    - `htmlBody`
    - `receivedAt`
    
# Optional

If your webhook supports API token checks, use
`setWebhookApiKey.ps1` to store the `WEBHOOK_API_KEY` secret.

# Usage

Once deployed, the worker will forward incoming emails to the specified webhook URL. The webhook should be prepared to handle a `POST` request with the provided payload structure.

Example payload:

```json
{
  "to": "recipient@example.com",
  "from": "sender@example.com",
  "subject": "Test Email",
  "htmlBody": "<p>This is a test email.</p>",
  "receivedAt": ""
}
```

# Working with macOS

To make it easier to remember the commands, you can install PowerShell and add execute permissions for all `.ps1` files. You can also run `chmod +x plus-x-all-ps1.sh` and execute it to set permissions automatically.

# Debugging

1. Make sure `.dev.vars` has `DEBUG_MODE` set to `true` and `WEBHOOK_URL` pointing to your receiving endpoint.
2. Optionally set `WEBHOOK_API_KEY`.
3. Run `run-dev.ps1`.
4. Send fake emails locally using `sendEmail.http` (requires the REST Client extension for VS Code).

# Deployment

1. Run `login.ps1` (this will open a browser and prompt you to log in with your Cloudflare account).
2. Run `deploy.ps1`.

# License

This project is licensed under the MIT License. See `LICENSE` for details.
