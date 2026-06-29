import { Module } from '@nestjs/common';

import { OauthModule }
from './oauth/oauth.module';

import { AuthModule }
from './auth/auth.module';

import { AppController }
from './app.controller';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports:  [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      serveRoot: '/',
    }),
    AuthModule,
    OauthModule,
  ],

  controllers: [
    AppController,
  ],
})
export class AppModule {}