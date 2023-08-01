import {
  InstanceValidator,
  OptionalStringValidator,
  StringValidator,
} from '@common';

export class SlackAlertOptions {
  @StringValidator()
  readonly webHooklUrl: string;

  @OptionalStringValidator()
  readonly channelName?: string;

  @OptionalStringValidator()
  readonly description?: string;

  @OptionalStringValidator()
  readonly viewerUrl?: string;
}

export class SlackConfig {
  @InstanceValidator(SlackAlertOptions)
  readonly serverErrorAlert: SlackAlertOptions;

  @InstanceValidator(SlackAlertOptions)
  readonly sqsAlert: SlackAlertOptions;
}
