import { Controller, Get, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { Roles } from '../auth/decorators/roles.decorators';

@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Roles(['ADMIN', 'OPERATOR'])
  @Post('')
  create(@Payload() createHistoryDto: CreateHistoryDto) {
    return this.historiesService.create(createHistoryDto);
  }

  @Roles(['ADMIN', 'OPERATOR'])
  @Post('failed')
  createFailed(@Payload() createHistoryDto: CreateHistoryDto) {
    return this.historiesService.createFailed(createHistoryDto);
  }

  @Roles(['ADMIN'])
  @Get('')
  findAll(@Payload() options: any) {
    return this.historiesService.findAll(options);
  }

  // @Roles(['ADMIN'])
  // findOne(@Payload() checkHistory: CheckHistoryDto) {
  //   return this.historiesService.checkHistory(checkHistory);
  // }

  @Roles(['ADMIN'])
  @Get('report')
  dashboard() {
    return this.historiesService.dashboard();
  }
}
