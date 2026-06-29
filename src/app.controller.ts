import {
  Controller,
  Get,
} from '@nestjs/common';

@Controller()
export class AppController {
  @Get('profile')
  profile() {
    return {
      app: 'neebYs',
      user: 'Shailu',
      connected: true,
    };
  }

  @Get('me')
  me() {
    return {
      uid: '1',
      name: 'Shailu',
      email: 'shailu@neebys.com',
      connected: true,
    };
  }
}