import { Message as AwsSqsMessage } from '@aws-sdk/client-sqs';
import { IncomingWebhookSendArguments, MessageAttachment } from '@slack/client';
import { Request } from 'express';

import { SqsMessage } from '../interface';
import { DateUtil } from '../util';

type Viewer = {
  /**
   * 모니터링을 위해 연결할 플랫폼 Url ex)sentry, aws
   */
  viewerUrl: string;
  /**
   * 플랫폼 연결 링크 a태그의 text 속성
   */
  viewerText: string;
};
type MessageOptions = {
  /**
   * 서버 이름
   */
  appType: 'Admin' | 'User' | 'Notification';
  /**
   * 메시지 헤더
   */
  header: string;
  /**
   * 메시지 타입
   */
  type: 'Alert' | 'Error' | 'Sender';
  /**
   * 메세지 발행 주체 ex)className
   */
  trigger: string;
  /**
   * 모니터링 플렛폼 정보
   */
  viewer?: Viewer;
};
type AlertMessageOptions = MessageOptions & {
  type: 'Alert';
};
type ErrorMessageOptions = MessageOptions & {
  type: 'Error';
  error: Error;
  request?: Request;
  awsSqsMessage?: AwsSqsMessage;
};
type SenderMessageOptions = MessageOptions & {
  type: 'Sender';
  senderBody: {
    to: string;
    template: string;
    message: string;
    additionalData?: string;
  };
};

export class SlackTemplate {
  public static senderTemplate(
    options: SenderMessageOptions,
  ): IncomingWebhookSendArguments {
    const { senderBody } = options;
    const defaultAttachment = this.makeDefaultAttachment(options);

    const makeFieldBySenderMessage = () => {
      return {
        color: 'good',
        fields: [
          {
            title: `*Template*: ${senderBody.template}`,
            value: '```' + senderBody.message + '```',
            short: false,
          },
        ],
      };
    };
    const senderField = makeFieldBySenderMessage();

    return {
      attachments: [defaultAttachment, senderField],
    };
  }

  public static alertTemplate(
    options: AlertMessageOptions,
  ): IncomingWebhookSendArguments {
    const { viewer } = options;
    const defaultAttachment = this.makeDefaultAttachment(options);
    const viewerAttachment = this.makeViewerAttachment(viewer);
    return {
      attachments: [defaultAttachment, viewerAttachment],
    };
  }

  public static errorTemplate(
    options: ErrorMessageOptions,
  ): IncomingWebhookSendArguments {
    const { error, viewer, request, awsSqsMessage } = options;
    const defaultAttachment = this.makeDefaultAttachment(options);
    const viewerAttachment = this.makeViewerAttachment(viewer);

    const makeFieldByRequest = (request: Request) => ({
      title: `*Error Request*: ${request.method} ${decodeURI(request.url)}`,
      value: '```' + JSON.stringify(request.body) + '```',
      short: false,
    });
    const makeFieldBySqsMessage = (sqsMessage: AwsSqsMessage) => {
      const message: SqsMessage = JSON.parse(sqsMessage.Body);
      return {
        title: `*Error SqsMessage*: ${message.type}`,
        value: '```' + JSON.stringify(sqsMessage) + '```',
        short: false,
      };
    };

    const requestField = request && makeFieldByRequest(request);
    const sqsMessageField =
      awsSqsMessage && makeFieldBySqsMessage(awsSqsMessage);

    return {
      attachments: [
        defaultAttachment,
        {
          color: 'danger',
          fields: [
            {
              title: `*Error Message*: ${error.message}`,
              value: '```' + error.stack + '```',
              short: false,
            },
            requestField,
            sqsMessageField,
          ],
        },
        viewerAttachment,
      ],
    };
  }

  private static makeDefaultAttachment(
    options: MessageOptions,
  ): MessageAttachment {
    return {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: `[ ${options.appType} ] ${options.header}`,
            emoji: true,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Type:*\n${options.type}`,
            },
            {
              type: 'mrkdwn',
              text: `*Created by:*\n${options.appType}-api-server`,
            },
          ],
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Created:*\n${DateUtil.toFormat(new Date())}`,
            },
            {
              type: 'mrkdwn',
              text: `*trigger:*\n${options.trigger}`,
            },
          ],
        },
      ],
    };
  }
  private static makeViewerAttachment(viewer: Viewer): MessageAttachment {
    return {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `<${viewer.viewerUrl}| 🔍 ${viewer.viewerText}>`,
          },
        },
      ],
    };
  }
}
