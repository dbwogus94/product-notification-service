import { IntValidator, InstanceValidator, StringValidator } from '@app/common';

import {
  BaseConfig,
  CorsConfig,
  SentryConfig,
  SlackConfig,
  SwaggerConfig,
} from '@app/config';

export class AppConfig extends BaseConfig {
  @StringValidator()
  readonly appName: string;

  @StringValidator()
  readonly appType: string;

  @StringValidator()
  readonly host: string;

  @IntValidator()
  readonly port: number = 80;

  @InstanceValidator(CorsConfig)
  readonly cors: CorsConfig;

  // 인프라 관련 설정
  @InstanceValidator(SwaggerConfig)
  readonly swagger: SwaggerConfig;

  @InstanceValidator(SentryConfig)
  readonly sentry: SentryConfig;

  @InstanceValidator(SlackConfig)
  readonly slack: SlackConfig;
}
