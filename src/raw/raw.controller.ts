import {
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RawService } from './raw.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/decorators/roles.decorators';

@Controller('datas')
export class RawController {
  constructor(private readonly rawService: RawService) {}

  @Post()
  @Roles(['ADMIN'])
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.rawService.create(file);
  }

  @Get()
  @Roles(['ADMIN_ANSEI'])
  findAll(
    @Query('page') pageNumber?: number,
    @Query('limit') pageSize?: number,
  ) {
    return this.rawService.findAll(pageNumber, pageSize);
  }

  // @MessagePattern('findOneRaw')
  // findOne(@Payload() id: number) {
  //   return this.rawService.findOne(id);
  // }

  @Delete()
  remove() {
    return this.rawService.remove();
  }
}
