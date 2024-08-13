import { IsNotEmpty } from 'class-validator';

export class BettingSiteLogDto {
  @IsNotEmpty()
  user_ip: string;

  @IsNotEmpty()
  request_time_date: string;

  @IsNotEmpty()
  betting_site: string;
}
