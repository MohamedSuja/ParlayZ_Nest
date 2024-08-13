import { Module } from '@nestjs/common';
import { UserLogService } from './user_log.service';
import { UserLogController } from './user_log.controller';

@Module({
  controllers: [UserLogController],
  providers: [UserLogService],
})
export class UserLogModule {}
