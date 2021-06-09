import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
// import { CategoryType } from '../../categories/dto/create-category.dto';

export class AbstractPaginationDto {
  @IsOptional()
  page: number = 1;

  @IsOptional()
  limit: number = 10;
}
