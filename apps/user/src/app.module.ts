import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig, LocalConfig } from './app-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [() => AppConfig.validate(LocalConfig)],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
