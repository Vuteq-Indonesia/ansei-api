import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { Roles } from '../auth/decorators/roles.decorators';
import { CheckHistoryDto } from './dto/check-history.dto';

@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Roles(['ADMIN', 'OPERATOR'])
  @Post('')
  create(@Payload() createHistoryDto: CreateHistoryDto, @Req() req: any) {
    return this.historiesService.create(
      createHistoryDto,
      req['user']['username'],
    );
  }

  @Roles(['ADMIN', 'OPERATOR'])
  @Post('failed')
  createFailed(@Payload() createHistoryDto: CreateHistoryDto, @Req() req: any) {
    return this.historiesService.createFailed(
      createHistoryDto,
      req['user']['username'],
    );
  }

  @Roles(['ADMIN'])
  @Get('')
  findAll(@Payload() options: any) {
    return this.historiesService.findAll(options);
  }

  @Roles(['ADMIN', 'OPERATOR'])
  @Post('check')
  findOne(@Body() checkHistoryDto: CheckHistoryDto) {
    return this.historiesService.checkHistory(checkHistoryDto);
  }

  @Roles(['ADMIN'])
  @Get('report')
  dashboard() {
    return this.historiesService.dashboard();
  }
}
