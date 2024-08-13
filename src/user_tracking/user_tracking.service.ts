import { Injectable } from '@nestjs/common';

@Injectable()
export class UserTrackingService {
  saveBettingSiteLog(body: any) {
    return {
      message: 'Betting site log saved successfully',
      data: body,
    };
  }
}
