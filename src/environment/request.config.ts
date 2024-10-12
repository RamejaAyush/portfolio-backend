import { Context } from "hono";

export const getConfig = (c: Context) => ({
  sendGridApiKey: c.env.SENDGRID_API,
  sendTo: c.env.SENDTO,
  email: c.env.EMAIL,
});
