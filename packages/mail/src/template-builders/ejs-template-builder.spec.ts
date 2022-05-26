import { Test } from '@nestjs/testing';
import { EjsTemplateBuilder } from './ejs-template-builder';
import { ITemplateBuilder } from '../interfaces/template-builder.interface';
import { MailType } from '../mail-type';
import { linkToFileBuildInput, linkToFileHtml } from '../fixtures';

describe('EjsTemplateBuilder', () => {
  let templateBuilder: EjsTemplateBuilder;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [EjsTemplateBuilder],
    }).compile();

    templateBuilder = moduleRef.get(EjsTemplateBuilder);
    await templateBuilder.onModuleInit();
  });

  it('should be defined', () => {
    expect(templateBuilder).toBeDefined();
  });

  it('should build send link to file html', async () => {
    const result = await (templateBuilder as ITemplateBuilder).build(
      MailType.LINK_TO_FILE,
      linkToFileBuildInput,
    );
    expect(result).toEqual(linkToFileHtml);
  });
});
