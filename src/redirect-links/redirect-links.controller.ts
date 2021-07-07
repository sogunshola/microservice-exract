import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RedirectLinksService } from './redirect-links.service';
import { CreateRedirectLinkDto } from './dto/create-redirect-link.dto';
import { UpdateRedirectLinkDto } from './dto/update-redirect-link.dto';
import { sendObjectResponse } from '../utils/response-transformers';

@Controller()
export class RedirectLinksController {
  constructor(private readonly redirectLinksService: RedirectLinksService) {}

  // @MessagePattern('createRedirectLink')
  // create(@Payload() createRedirectLinkDto: CreateRedirectLinkDto) {
  //   return this.redirectLinksService.create(createRedirectLinkDto);
  // }

  // @MessagePattern('findAllRedirectLinks')
  // findAll() {
  //   return this.redirectLinksService.findAll();
  // }

  @MessagePattern({ cmd: 'findOneRedirectLink' })
  async findOne(@Payload() id: string) {
    const response = await this.redirectLinksService.findOne(id);
    return sendObjectResponse(response, 'redirect_link', 'Successful');
  }

  // @MessagePattern('updateRedirectLink')
  // update(@Payload() updateRedirectLinkDto: UpdateRedirectLinkDto) {
  //   return this.redirectLinksService.update(updateRedirectLinkDto.id, updateRedirectLinkDto);
  // }

  // @MessagePattern('removeRedirectLink')
  // remove(@Payload() id: number) {
  //   return this.redirectLinksService.remove(id);
  // }
}
