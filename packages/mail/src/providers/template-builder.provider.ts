import { ClassProvider } from '@nestjs/common';
import { ITemplateBuilder } from '../interfaces/template-builder.interface';
import { EjsTemplateBuilder } from '../template-builders/ejs-template-builder';

export const TEMPLATE_BUILDER_TOKEN = Symbol('TEMPLATE_BUILDER_TOKEN');

export const templateBuilderProvider: ClassProvider<ITemplateBuilder> = {
  provide: TEMPLATE_BUILDER_TOKEN,
  useClass: EjsTemplateBuilder,
};
