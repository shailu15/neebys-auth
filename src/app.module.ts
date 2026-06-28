import { Module } from '@nestjs/common';

import { OauthModule }
from './oauth/oauth.module';

import { AuthModule }
from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    OauthModule,
  ],
})
export class AppModule {}