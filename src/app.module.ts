import { Module } from '@nestjs/common';
import { UserTrackingService } from './user_tracking/user_tracking.service';
import { UserTrackingController } from './user_tracking/user_tracking.controller';
import { UserTrackingModule } from './user_tracking/user_tracking.module';

@Module({
  imports: [UserTrackingModule],
  controllers: [UserTrackingController],
  providers: [UserTrackingService],
})
export class AppModule {}
