import { LinkToFileInput } from './inputs';
import { LinkToFileBuildInput } from './interfaces/template-builder.interface';
import { SendInput } from './interfaces/transporter.interface';

export const email = 'email';

export const linkToFileInput: LinkToFileInput = {
  firstName: 'firstName',
  lastName: 'lastName',
  email,
  link: 'link',
};

export const linkToFileBuildInput: LinkToFileBuildInput = {
  name: `${linkToFileInput.firstName} ${linkToFileInput.lastName}`,
  link: linkToFileInput.link,
};

export const linkToFileHtml = `<!doctype html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport'
          content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>Link to download your compressed file</title>
</head>
<body>
<h1>Hi, firstName lastName</h1>
<h2>Please, use this <a href='link'>link</a> to download your compressed file</h2>
</body>
</html>
`;

export const linkToFileSendInput: SendInput = {
  from: email,
  to: linkToFileInput.email,
  subject: 'Link to download your compressed file',
  html: linkToFileHtml,
};
