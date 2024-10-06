import app from "./routes";
import { serve } from "bun";

serve({
  fetch: app.fetch,
  port: 8080,
});

console.log(`Portfolio backend is runnning on http://localhost:8080`);
