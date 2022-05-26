type Config = typeof config;
export type SmtpConfig = Config['smtp'];
export type ServerConfig = Config['server'];

const config = {
  smtp: {
    host: process.env.SMTP_HOST as string,
    port: Number(process.env.SMTP_PORT),
    user: process.env.SMTP_USER as string,
    password: process.env.SMTP_PASSWORD as string,
  },
  server: {
    email: process.env.EMAIL as string,
  },
};

export default () => config;
