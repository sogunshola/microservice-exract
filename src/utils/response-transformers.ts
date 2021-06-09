import { ListResponse, Pagination } from './list.response';
import { ObjectResponse } from './object.response';
import { FindConditions, FindManyOptions } from 'typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';

export function sendObjectResponse(
  data: Object,
  object: string,
  message: string,
  status = true,
): ObjectResponse {
  return {
    status,
    message,
    object,
    ...data,
  };
}

export function sendListResponse(
  response: any,
  object: string,
  message: string,
  status = true,
): ListResponse {
  return {
    list: response.list,
    pagination: response.pagination,
    status,
    message,
    object,
  };
}

export async function PaginateItems(
  repository: any,
  options: IPaginationOptions,
  searchOptions: FindConditions<unknown> | FindManyOptions<unknown> = {},
) {
  const response = await paginate(repository, options, searchOptions);
  // console.log(response);

  const pagination: Pagination = {
    page: Number(response.meta.currentPage),
    pageCount: Number(response.meta.totalPages),
    perPage: Number(response.meta.itemsPerPage),
    total: Number(response.meta.totalItems),
    skipped: Number(
      response.meta.itemsPerPage * (response.meta.currentPage - 1),
    ),
  };

  return {
    list: response.items,
    pagination,
  };
}
