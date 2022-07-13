export type SendInput = {
  from: string;
  to: string;
  subject: string;
  html: string;
  cc?: string[];
};

export interface ITransporter {
  send(input: SendInput): Promise<void>;
}
