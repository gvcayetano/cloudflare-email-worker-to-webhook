// Copyright (c) 2025 gvcayetano
// This software is licensed under the MIT License.

// for postal-mime, thanks to https://docs.emailengine.app/how-to-parse-emails-with-cloudflare-email-workers/
import PostalMime from "postal-mime";

export default {
  async email(message, env, ctx) {
    try {
      const isDebugMode = env.DEBUG_MODE === "true";
      const { to, from } = message;
      const email = await PostalMime.parse(message.raw);
      const { subject, html: htmlBody, date: receivedAt } = email;
      const payload = { to, from, subject, htmlBody, receivedAt };

      const headers = new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json",
      });
      
      const apiKey = env.WEBHOOK_API_KEY;
      if (apiKey) {
        headers.append("Authorization", `Bearer ${apiKey}`);
      }

      if (isDebugMode) {
        console.log(payload);
        for (const [key, value] of headers.entries()) {
          console.log(`${key}: ${value}`);
        }
      }

      return await fetch(env.WEBHOOK_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });
      
    } catch (exception) {
      const message = "Error failed to push to webhook:";
      console.error(message, exception);
      return new Response(
        JSON.stringify({
          status: "error",
          message: message,
          error: exception.message,
        }),
        { headers: { "Content-Type": "application/json" }, status: 500 }
      );
    }
  },
  async fetch(request, env, ctx) {
    const isDebugMode = env.DEBUG_MODE === "true";

    console.log("Fetch event is on debug mode:", isDebugMode);
    if (isDebugMode){
      if (request.method === "POST") 
        {
        try {
          const emailData = await request.json();
          console.log("Received email data:", emailData);
          return await this.email(emailData, env, ctx);
        } catch (error) {
          console.error(error);
          return new Response("Invalid JSON", { status: 400 });
        }
      }
    }
    return new Response("Hello from Worker", { status: 200 });
  },
};
