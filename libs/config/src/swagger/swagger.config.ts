import { InstanceValidator, StringValidator } from '@app/common';
import {
  InfoObject,
  SecuritySchemeObject,
  SecuritySchemeType,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class SwaggerInfo implements InfoObject {
  @StringValidator()
  title: string;

  @StringValidator()
  description: string;

  @StringValidator()
  version = '1.0';
}

class SwaggerSecurityOptions implements SecuritySchemeObject {
  @StringValidator()
  type: SecuritySchemeType;

  @StringValidator()
  name: string;

  @StringValidator()
  description: string;

  @StringValidator()
  in: string;
}
class SwaggerBearerAuthOptions extends SwaggerSecurityOptions {
  @StringValidator()
  scheme?: string;

  @StringValidator()
  bearerFormat: string;
}
class SwaggerCustomAuthOptions extends SwaggerSecurityOptions {}

export class SwaggerSecurityConfig {
  @StringValidator()
  name: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(({ object }) => {
    const type: SecuritySchemeType = object.securityOptions.type;
    switch (type) {
      case 'http':
        // TODO: 'http와', 'apiKey'가 반대로 들어가는 경우 에러를 찾기 어려워서 추가적인 작업이 필요해 보인다.
        // const option: SwaggerBearerAuthOptions = object.securityOptions;
        // if(option.scheme) {}
        return SwaggerBearerAuthOptions;
      case 'apiKey':
        return SwaggerCustomAuthOptions;
      case 'oauth2':
      case 'openIdConnect':
        throw new Error('[SwaggerOptions] Type is no supported.');
    }
  })
  securityOptions: SwaggerBearerAuthOptions | SwaggerCustomAuthOptions;
}

export class SwaggerOptions {
  @InstanceValidator(SwaggerInfo)
  info: SwaggerInfo;

  @InstanceValidator(SwaggerSecurityConfig)
  securityConfig: SwaggerSecurityConfig;
}

export class SwaggerConfig {
  @InstanceValidator(SwaggerOptions)
  docsOption: SwaggerOptions;
}
