import { Module } from '@nestjs/common';
import { CustomHttpModule } from './http';
import { CustomLoggerModule } from './logger';

@Module({
  imports: [CustomHttpModule, CustomLoggerModule],
  exports: [CustomHttpModule, CustomLoggerModule],
})
export class GlobalModule {}
