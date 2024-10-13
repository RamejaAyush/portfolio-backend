import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { IENV } from "./interface/env";
import smtpRouter from "./routes/smtp.route";
import { limiter } from "./middleware/limitter.middleware";

const app = new Hono<{ Bindings: IENV }>();

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "http://www.ayushrameja.com"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    maxAge: 86400,
  })
);

app.use(logger());

app.route("/", smtpRouter);

export default app;
