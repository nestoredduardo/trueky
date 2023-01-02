import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";

import { env } from "@/env/server.mjs";

const transport = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 465,
  auth: {
    user: "apikey",
    pass: env.SMTP_PASSWORD,
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: "replace@me.with.your.com",
  configPath: "./mailing.config.json",
});

export default sendMail;
