import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { CheckHistoryDto } from './dto/check-history.dto';

@Controller()
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @MessagePattern('createHistory')
  create(@Payload() createHistoryDto: CreateHistoryDto) {
    return this.historiesService.create(createHistoryDto);
  }

  @MessagePattern('createHistoryFailed')
  createFailed(@Payload() createHistoryDto: CreateHistoryDto) {
    return this.historiesService.createFailed(createHistoryDto);
  }

  @MessagePattern('findAllHistories')
  findAll(@Payload() options: any) {
    return this.historiesService.findAll(options);
  }

  @MessagePattern('checkHistory')
  findOne(@Payload() checkHistory: CheckHistoryDto) {
    return this.historiesService.checkHistory(checkHistory);
  }

  @MessagePattern('dashboard')
  dashboard() {
    return this.historiesService.dashboard();
  }
}
