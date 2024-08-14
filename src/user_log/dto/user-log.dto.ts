import { IsNotEmpty } from 'class-validator';
import { IsIdAbsent } from 'src/utils/custom_validator/isIdAbsent';

export class UserLogDto {
  @IsNotEmpty()
  user_ip: string;

  @IsNotEmpty()
  request_time_date: string;

  @IsNotEmpty()
  betting_site: string;
}
