import { Hono } from "hono";
import { logger } from "hono/logger";
import { IENV } from "./interface/env";
import smtpRouter from "./routes/smtp.route";

const app = new Hono<{ Bindings: IENV }>();

app.use(logger());

app.route("/", smtpRouter);

export default app;
