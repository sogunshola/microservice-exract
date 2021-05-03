export class Pagination {
  // @ApiProperty()
  page: number;
  // @ApiProperty()
  pageCount: number;
  // @ApiProperty()
  perPage: number;
  // @ApiProperty()
  skipped: number;
  // @ApiProperty()
  total: number;
}

export class ListResponse {
  // @ApiProperty()
  status?: boolean;

  // @ApiProperty()
  message: string;

  // @ApiProperty()
  object: string;

  // @ApiProperty()
  list: object[];

  // @ApiProperty()
  pagination?: Pagination;
}
