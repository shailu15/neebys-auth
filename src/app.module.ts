import { Module } from '@nestjs/common';

import { OauthModule }
from './oauth/oauth.module';

import { AuthModule }
from './auth/auth.module';

import { AppController }
from './app.controller';

@Module({
  imports: [
    AuthModule,
    OauthModule,
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule {}