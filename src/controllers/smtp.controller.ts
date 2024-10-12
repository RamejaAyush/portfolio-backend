import { Context } from "hono";
import { IRequest } from "../interface/IRequest";
import { sendMessageService } from "../services/smtp.service";

export const sendMessageController = async (c: Context) => {
  console.log(
    "--- Inside sendMessageController | ./controllers/smtp.controller.ts | POST ---"
  );

  try {
    const { name, content } = (await c.req.json()) as IRequest;

    if (!name || !content) {
      const errorMessage: string = `Missing fields: name and content are required fields.`;
      console.log(errorMessage);
      return c.json(
        {
          status: false,
          message: errorMessage,
        },
        400
      );
    }

    const mail = await sendMessageService(c, name, content);

    if (!mail.status) {
      console.error(mail.message);
      return c.json(
        {
          status: mail.status,
          message: mail.message,
          data: mail.data,
        },
        mail.code === 200 ? 200 : 500
      );
    }

    console.log(mail.message);
    return c.json(
      {
        status: mail.status,
        message: mail.message,
        data: mail.data,
      },
      200
    );
  } catch (error: any) {
    const errorMessage: string = `Internal server error: Unable to send mail.`;
    console.error(errorMessage, error);
    return c.json(
      {
        status: false,
        message: errorMessage,
      },
      500
    );
  }
};
