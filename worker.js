// for postal-mime, thanks to https://docs.emailengine.app/how-to-parse-emails-with-cloudflare-email-workers/
import PostalMime from "postal-mime";

export default {
  async email(message, env, ctx) {
    try {
      const { to, from, headers } = message;
      const email = await PostalMime.parse(message.raw);

      const payload = {
        to: to,
        from: from,
        headers: headers,
        htmlBody: email.html,
      };

      await fetch(env.WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      return new Response("Email pushed to webhook successfully!", {
        status: 200,
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
  async fetch(request) {
    return new Response("Hello from my Worker!");
  },
};
