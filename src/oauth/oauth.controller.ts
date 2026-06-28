import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Headers,
  Res,
} from '@nestjs/common';

import { LoginDto }
from './dto/login.dto';

import type { Response }
from 'express';

import { OauthService }
from './oauth.service';

import { TokenDto }
from './dto/token.dto';

@Controller('oauth')
export class OauthController {
  constructor(
    private readonly oauthService:
      OauthService,
  ) {}

  @Get('authorize')
  authorize(
    @Query('client_id')
    clientId?: string,

    @Query('redirect_uri')
    redirectUri?: string,
    

    @Res()
    res?: Response,
  ) {
    const result =
      this.oauthService.authorize(
        clientId,
        redirectUri,
      );

    if (
      result &&
      'redirect' in result &&
      result.redirect
    ) {
      return res?.redirect(
        result.redirect,
      );
    }

    return res?.json(
      result,
    );
  }

  @Post('login')
login(
  @Body()
  body: LoginDto,
) {
  return this.oauthService.login(
    body.uid,
    body.name,
    body.email,
    body.photo,
  );
}

  @Post('token')
  token(
    @Body()
    body: TokenDto,
  ) {
    return this.oauthService.token(
      body.code,
    );
  }

  @Get('me')
  me(
    @Headers(
      'authorization',
    )
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

  @Post('revoke')
  revoke(
    @Headers(
      'authorization',
    )
    authorization?: string,
  ) {
    const token =
      authorization?.replace(
        'Bearer ',
        '',
      );

    return this.oauthService.revoke(
      token,
    );
  }
}