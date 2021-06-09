import { IsEnum, IsOptional, IsIn } from 'class-validator';

export class PaginationDto {
  @IsOptional() page: number = 1;

  @IsOptional() limit: number = 10;
}

export class FilterPayoutDto {
  @IsOptional()
  date: string;
  @IsOptional()
  status: string;
  @IsOptional()
  ownerId: string;
}

export class FilterOwnerPayoutDto {
  @IsOptional()
  date: string;
  @IsOptional()
  status: string;
  @IsOptional()
  @IsIn(['greater', 'lesser', 'between'])
  range: string;
  @IsOptional()
  startDate: string;

  @IsOptional()
  endDate: string;
}
