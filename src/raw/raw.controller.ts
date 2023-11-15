import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RawService } from './raw.service';
import { CreateRawDto } from './dto/create-raw.dto';

@Controller()
export class RawController {
  constructor(private readonly rawService: RawService) {}

  @MessagePattern('createRaw')
  create(@Payload() createRawDto: CreateRawDto[]) {
    return this.rawService.create(createRawDto);
  }

  @MessagePattern('findAllRaw')
  findAll(@Payload() options: any) {
    return this.rawService.findAll(options);
  }

  @MessagePattern('findOneRaw')
  findOne(@Payload() id: number) {
    return this.rawService.findOne(id);
  }

  @MessagePattern('removeRaw')
  remove(@Payload() id: number) {
    return this.rawService.remove(id);
  }
}
