import { buildSwagger } from '@app/common';
import { SwaggerConfig } from '@app/config';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export default function swaggerbuilder(
  basePath: string,
  app: INestApplication,
): void {
  const configService = app.get(ConfigService);
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  const { docsOption } = swaggerConfig;

  buildAllServiceSwagger(`${basePath}`);

  function buildAllServiceSwagger(adminPath: string) {
    buildSwagger(adminPath, app, docsOption);
  }
}
