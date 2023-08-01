import { AppModule } from './app.module';
import { NestBuilder } from '@app/common';
import swaggerbuilder from './swagger/build-swagger-by-services';

async function bootstrap() {
  const builder = new NestBuilder();
  const AppName = process.env.APP_NAME ?? 'Admin';
  await builder.createNestApp(AppModule, AppName);

  return process.env.NODE_ENV === 'production'
    ? await builder //
        .preInitServer({ globalPrifix: '/api' })
        .setSentry()
        .initServer()
    : await builder
        .preInitServer({ globalPrifix: '/api' })
        .setDocs(swaggerbuilder, { basePatch: '/docs' })
        .setSentry()
        .initServer();
}
bootstrap();
