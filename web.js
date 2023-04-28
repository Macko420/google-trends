import fetch, { Response, Request } from "node-fetch";

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1099438330027970570/bGlucgJjz8av7f58y8yAbmb0eC2U2tGqOJTb-YH5_BWT7o-_CAE3eZu01KEU135SCuTC";

async function handleRequest(request) {
  const { method, headers } = request;

  if (method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  if (!headers.get("content-type").includes("application/json")) {
    return new Response("Invalid Content Type", { status: 415 });
  }

  const body = await request.text();
  const json = JSON.parse(body);

  const embed = {
    title: "New message from Cloudflare Worker",
    description: json.message,
    timestamp: new Date().toISOString(),
  };

  const data = JSON.stringify({ embeds: [embed] });
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };

  const response = await fetch(DISCORD_WEBHOOK_URL, init);

  if (!response.ok) {
    return new Response("Failed to send message", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}

export async function sendRequest() {
  const request = new Request(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "Hello, Discord!" }),
  });

  const response = await handleRequest(request);
  console.log(response.status); // 200
}
