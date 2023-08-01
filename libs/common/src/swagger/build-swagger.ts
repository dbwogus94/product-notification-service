import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SwaggerOptions } from '@app/config';

export function buildSwagger(
  path: string,
  app: INestApplication,
  options: SwaggerOptions,
  // eslint-disable-next-line @typescript-eslint/ban-types
  modules: Function[] = void 0,
): void {
  const { info, securityConfig } = options;
  const { title, description, version } = info;
  const documentBuilder = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version);

  if (securityConfig) {
    const { securityOptions, name } = securityConfig;
    documentBuilder.addBearerAuth(securityOptions, name);
  }

  const swaggerConfig = documentBuilder.build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    include: modules,
  });
  SwaggerModule.setup(path, app, document);
}
