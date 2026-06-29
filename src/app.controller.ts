import {
  Controller,
  Get,
  Headers,
} from '@nestjs/common';

import { OauthService }
from './oauth/oauth.service';

@Controller()
export class AppController {
  constructor(
    private readonly oauthService: OauthService,
  ) {}

  @Get('profile')
  profile() {
    return {
      app: 'neebYs',
      user: 'Shailu',
      connected: true,
    };
  }

  @Get('me')
  me(
    @Headers('authorization')
    authorization?: string,
  ) {
    const token =
      authorization?.replace(
        'Bearer ',
        '',
      );

    return this.oauthService.me(
      token,
    );
  }

  @Get('health')
  health() {
    return {
      status: 'ok',
      app: 'neebYs',
      version: '1.0.0',
      uptime: 'running',
    };
  }
}