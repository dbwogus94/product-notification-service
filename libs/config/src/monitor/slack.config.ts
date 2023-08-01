import {
  InstanceValidator,
  StringValidator,
  StringValidatorOptional,
} from '@app/common';

export class SlackAlertOptions {
  @StringValidator()
  readonly webHooklUrl: string;

  @StringValidatorOptional()
  readonly channelName?: string;

  @StringValidatorOptional()
  readonly description?: string;

  @StringValidatorOptional()
  readonly viewerUrl?: string;
}

export class SlackConfig {
  @InstanceValidator(SlackAlertOptions)
  readonly serverErrorAlert: SlackAlertOptions;
}
