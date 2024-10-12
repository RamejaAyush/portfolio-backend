import { Hono } from "hono";
import { Context } from "hono";
import { sendMessageController } from "../controllers/smtp.controller";

const smtpRouter = new Hono();

smtpRouter.get("/", (c: Context) => {
  const message: string = "Hello world from Ayush Rameja";
  console.log(message);
  return c.json(
    {
      status: true,
      message,
    },
    200
  );
});

smtpRouter.post("/send-message", sendMessageController);

export default smtpRouter;
