import { IsEmpty, IsNotEmpty, IsUrl } from 'class-validator';
import { IsIdAbsent } from 'src/utils/custom_validator/isIdAbsent';

export class UserLogDto {
  // reject when enter id
  @IsIdAbsent()
  id: any;

  @IsNotEmpty()
  user_ip: string;

  @IsNotEmpty()
  request_time_date: string;

  @IsNotEmpty()
  @IsUrl()
  betting_site: string;
}
