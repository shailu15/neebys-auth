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
}