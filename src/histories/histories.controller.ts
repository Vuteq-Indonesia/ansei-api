import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { Roles } from '../auth/decorators/roles.decorators';
import { CheckHistoryDto } from './dto/check-history.dto';

@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Roles(['ADMIN_ANSEI', 'OPERATOR'])
  @Post('')
  create(@Payload() createHistoryDto: CreateHistoryDto, @Req() req: any) {
    return this.historiesService.create(
      createHistoryDto,
      req['user']['username'],
    );
  }

  @Roles(['OPERATOR_ANSEI'])
  @Post('failed')
  createFailed(@Payload() createHistoryDto: CreateHistoryDto, @Req() req: any) {
    return this.historiesService.createFailed(
      createHistoryDto,
      req['user']['username'],
    );
  }

  @Roles(['ADMIN_ANSEI'])
  @Get('')
  findAll(@Payload() options: any) {
    return this.historiesService.findAll(options);
  }

  @Roles(['OPERATOR_ANSEI'])
  @Post('check')
  findOne(@Body() checkHistoryDto: CheckHistoryDto) {
    return this.historiesService.checkHistory(checkHistoryDto);
  }

  @Roles(['ADMIN_ANSEI'])
  @Get('report')
  dashboard() {
    return this.historiesService.dashboard();
  }
}
