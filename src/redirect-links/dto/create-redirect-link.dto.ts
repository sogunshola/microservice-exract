import { IsNotEmpty } from 'class-validator';

export class CreateRedirectLinkDto {
  @IsNotEmpty()
  link: string;
}
