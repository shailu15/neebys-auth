import {
  Controller,
  Get,
  Headers,
  Res,
} from '@nestjs/common';

import type { Response } from 'express';
import { OauthService } from './oauth/oauth.service';

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
    const token = authorization?.replace(
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

  @Get('openapi.yaml')
  openapi(
    @Res() res: Response,
  ) {
    res.type('text/yaml');

    res.send(`
openapi: 3.1.0

info:
  title: NeebYs
  version: 1.0.0
  description: NeebYs ChatGPT Integration

servers:
  - url: https://neebys-auth-production.up.railway.app

paths:
  /profile:
    get:
      operationId: getProfile
      summary: Get NeebYs profile
      responses:
        '200':
          description: Success

  /me:
    get:
      operationId: getMe
      summary: Get current user
      responses:
        '200':
          description: Success

  /health:
    get:
      operationId: getHealth
      summary: Check API health
      responses:
        '200':
          description: Success
`);
  }
}