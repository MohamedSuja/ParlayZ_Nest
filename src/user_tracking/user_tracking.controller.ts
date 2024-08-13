import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserTrackingService } from './user_tracking.service';
import { BettingSiteLogDto } from './dto/betting-site-log.dto';

@Controller('user-tracking')
export class UserTrackingController {
  constructor(private readonly userTrackingService: UserTrackingService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('save')
  async saveBettingSiteLog(@Body() body: BettingSiteLogDto) {
    return this.userTrackingService.saveBettingSiteLog(body);
  }
}
