import { Module } from '@nestjs/common';
import { RedirectLinksService } from './redirect-links.service';
import { RedirectLinksController } from './redirect-links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedirectLink } from './entities/redirect-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RedirectLink])],
  controllers: [RedirectLinksController],
  providers: [RedirectLinksService],
  exports: [RedirectLinksService],
})
export class RedirectLinksModule {}
