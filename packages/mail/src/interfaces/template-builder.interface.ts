import { MailType } from '../mail-type';

type LinkToFileBuildInput = {
  name: string;
  link: string;
};

export interface ITemplateBuilder {
  build(
    type: MailType.LINK_TO_FILE,
    input: LinkToFileBuildInput,
  ): Promise<string>;
}
