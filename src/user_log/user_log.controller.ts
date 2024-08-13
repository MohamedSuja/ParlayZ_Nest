import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserLogService } from './user_log.service';
import { Prisma } from '@prisma/client';
import { UserLogDto } from './dto/user-log.dto';

@Controller('user-log')
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserLogDto: UserLogDto) {
    return this.userLogService.create(createUserLogDto);
  }

  @Get()
  findAll() {
    return this.userLogService.findAll();
  }

  @Get(':user_ip')
  findOne(@Param('user_ip') user_ip: string) {
    return this.userLogService.findOne(user_ip);
  }

  @Patch(':user_ip')
  update(
    @Param('user_ip') user_ip: string,
    @Body() updateUserLogDto: Prisma.UserLogUpdateInput,
  ) {
    return this.userLogService.update(user_ip, updateUserLogDto);
  }

  @Delete(':user_ip')
  remove(@Param('user_ip') user_ip: string) {
    return this.userLogService.remove(user_ip);
  }
}
