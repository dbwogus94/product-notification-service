import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { BaseHttpService } from './base-http.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [BaseHttpService],
  exports: [BaseHttpService],
})
export class CustomHttpModule {}
