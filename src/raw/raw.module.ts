import { Module } from '@nestjs/common';
import { RawService } from './raw.service';
import { RawController } from './raw.controller';
import { ExcelService } from '../utils/excel.service';

@Module({
  controllers: [RawController],
  providers: [RawService, ExcelService],
})
export class RawModule {}
