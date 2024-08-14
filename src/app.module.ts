import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { UserLogModule } from './user_log/user_log.module';

@Module({
  imports: [DatabaseModule, UserLogModule],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
