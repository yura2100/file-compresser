import { OnModuleInit } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as ejs from 'ejs';
import { ITemplateBuilder } from '../interfaces/template-builder.interface';
import { MailType } from '../mail-type';

const templateNames: Record<MailType, string> = {
  [MailType.LINK_TO_FILE]: 'link-to-file.ejs',
};

export class EjsTemplateBuilder implements OnModuleInit, ITemplateBuilder {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private readonly builders: Record<MailType, ejs.AsyncTemplateFunction> = {};

  async onModuleInit(): Promise<void> {
    const cwd = process.cwd();
    for (const [type, name] of Object.entries(templateNames)) {
      const templatePath = path.join(cwd, 'resources/templates/ejs', name);
      const template = await fs.readFile(templatePath, 'utf-8');
      this.builders[type as MailType] = ejs.compile(template, { async: true });
    }
  }

  build(type: MailType, input: unknown): Promise<string> {
    const build = this.builders[type];
    return build(input as ejs.Data);
  }
}
