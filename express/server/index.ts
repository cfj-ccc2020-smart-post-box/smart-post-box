import './common/env';
import { expressServer } from './common/server';

const lineConfig = {
  channelAccessToken: (process.env.LINE_CH_ACCESS_TOKEN || 'test').toString(),
  channelSecret: (process.env.LINE_CH_SECRET || 'test').toString(),
};

const port = parseInt(process.env.PORT || '5000', 10);

(async (): Promise<void> => {
  await expressServer.connectToDB();
  await expressServer.setBodyParserOrLineSignatureParser(lineConfig);
  await expressServer.handleLineEv('/webhook/line/', lineConfig);
  // await expressServer.setSlackBolt('/webhook/slack/', process.env.SLACK_BOT_TOKEN, {
  //   signingSecret: process.env.SLACK_SIGNING_SECRET,
  //   endpoints: {
  //     commands: '/commands',
  //     events: '/events',
  //     interactive: '/interactive',
  //   },
  // });
  if (process.env.NODE_ENV !== 'development') {
    await expressServer.setSwaggerUI();
  }
  await expressServer.setNotFoundPage();
  await expressServer.setErrPage();
  await expressServer.setRedirectToHTTPS();
  await expressServer.listen(port);
})();
