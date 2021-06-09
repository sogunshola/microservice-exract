import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  sendObjectResponse,
  sendListResponse,
} from '../../utils/response-transformers';
import { AbstractPaginationDto } from '../dto/abstract-pagination.dto';
import { BasicCreateDto } from '../dto/basic-create.dto';

export abstract class AbstractController {
  service: any;
  name: string;

  @Post()
  async create(@Body() payload: any, ...args: any) {
    const response = await this.service.create(payload);
    return sendObjectResponse(
      response,
      `${this.name}_created`,
      `${this.name} Created`,
    );
  }

  // @ApiResponse({ status: 200, type: AbstractResponse })
  @Get()
  async findAll(@Query() pagination: AbstractPaginationDto) {
    const response = await this.service.findAll(pagination);
    return sendListResponse(response, `${this.name}_find_all`, 'Success');
  }

  // @ApiResponse({ status: 200, type: AbstractResponse })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.service.findOne(id);
    return sendObjectResponse(response, `${this.name}_find_one`, 'Success');
  }

  // @ApiResponse({ status: 200, type: AbstractResponse })
  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: any) {
    const response = await this.service.update(id, payload);
    return sendObjectResponse(
      response,
      `${this.name}_update`,
      `${this.name} Updated`,
    );
  }

  // @ApiResponse({ status: 200, type: AbstractResponse })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.service.remove(id);
    return sendObjectResponse(
      response,
      `${this.name}_delete`,
      `${this.name} Deleted`,
    );
  }
}
