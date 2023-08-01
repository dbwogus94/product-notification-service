import { ADMIN_ACCESS_TOKEN } from '@app/common';
import { AppConfig } from '../app/app.config';

export const LocalConfig: AppConfig = {
  appName: process.env.APP_NAME,
  appType: process.env.APP_TYPE,
  port: +process.env.PORT,
  host: 'http://localhost:' + process.env.PORT,
  cors: { origin: process.env.CORS_ORIGIN },

  swagger: {
    docsOption: {
      info: {
        title: process.env.SWAGGER_APIS_TITLE,
        description: process.env.SWAGGER_APIS_DESCRIPTION,
        version: process.env.SWAGGER_APIS_VERSION,
      },
      securityConfig: {
        name: ADMIN_ACCESS_TOKEN,
        securityOptions: {
          type: 'apiKey',
          name: '',
          description: 'Enter Access Token',
          in: 'header',
        },
      },
    },
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: +process.env.TRACES_SAMPLE_RATE,
  },
  slack: {
    serverErrorAlert: {
      channelName: process.env.SLACK_CHANNEL_NAME_BY_SERVER_ERROR_ALERT,
      webHooklUrl: process.env.SLACK_WEB_HOOK_URI_BY_SERVER_ERROR_ALERT,
      description: process.env.SLACK_DESCRIPTION_BY_SERVER_ERROR_ALERT,
      viewerUrl: process.env.SLACK_VIEWER_URL_BY_SERVER_ERROR_ALERT,
    },
  },
};
