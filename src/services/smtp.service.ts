import { Context } from "hono";
import sgMail from "@sendgrid/mail";
import { getConfig } from "../environment/request.config";

export const sendMessageService = async (
  c: Context,
  name: string,
  content: string
) => {
  const { sendGridApiKey, sendTo, email } = getConfig(c);

  try {
    sgMail.setApiKey(sendGridApiKey);

    const message = {
      to: sendTo,
      from: email,
      subject: `Message from ${name}`,
      text: `You got new message from ${name}: ${content}`,
      html: `<strong>You got new message from ${name}: ${content}</strong>`,
    };

    await sgMail.send(message);
    console.log(`Mail from ${name} sent!`);

    return {
      status: true,
      code: 200,
      message: `Thanks for your message, ${name}`,
      data: {
        name,
        content,
      },
    };
  } catch (error) {
    console.error("Error sending mail:", error);
    return { status: false, code: 500, message: "Unable to send mail" };
  }
};
