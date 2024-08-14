import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Param,
  Query,
} from '@nestjs/common';
import { UserLogService } from './user_log.service';
import { UserLogDto } from './dto/user-log.dto';
import * as path from 'path';
import { Response } from 'express';

@Controller('user-log')
export class UserLogController {
  constructor(private userLogService: UserLogService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserLogDto: UserLogDto) {
    return this.userLogService.create(createUserLogDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  filterUserLogByIpOrBettingSite(
    @Query('user_ip') userIp: string,
    @Query('betting_site') bettingSite: string,
  ) {
    return this.userLogService.filterUserLogByIpOrBettingSite(
      userIp,
      bettingSite,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('csv')
  async exportCsv(@Res() res: Response): Promise<void> {
    const filePath = await this.userLogService.generateCsv();
    const fileName = path.basename(filePath);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      }
    });
  }
}
