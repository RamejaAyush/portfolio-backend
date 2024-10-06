import { Hono, type Context } from "hono";

const app = new Hono();

app.get("/", (c: Context) => {
  console.log("Hello from bun!!");
  return c.json({
    success: true,
    message: "Hello from Bun and Hono!",
  });
});

export default app;
