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
import { AddUserLogDto } from './dto/add-user-log.dto';
import * as path from 'path';
import { Response } from 'express';
import { GetUserLogDto } from './dto/get-user-log.dto';

@Controller('user-log')
export class UserLogController {
  constructor(private userLogService: UserLogService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  addUserLog(@Body() addUserData: AddUserLogDto) {
    return this.userLogService.create(addUserData);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getUserLog(@Query() getUserLogDto: GetUserLogDto) {
    return this.userLogService.getUserLogService(getUserLogDto);
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
