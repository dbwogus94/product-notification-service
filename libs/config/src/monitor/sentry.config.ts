import { NodeOptions } from '@sentry/node';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SentryConfig implements NodeOptions {
  @IsNotEmpty()
  @IsString()
  dsn: string;

  @IsNotEmpty()
  @IsNumber()
  tracesSampleRate: number;
}
