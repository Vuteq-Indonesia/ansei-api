import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRawDto } from './dto/create-raw.dto';
import { UpdateRawDto } from './dto/update-raw.dto';
import { PrismaService } from 'nestjs-prisma';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RawService {
  constructor(private prismaService: PrismaService) {}

  async create(createRawDto: CreateRawDto[]) {
    try {
      return this.prismaService.rawData.createMany({
        data: createRawDto,
      });
    } catch (e) {
      throw new RpcException(new ConflictException('Raw Data was duplicate'));
    }
  }

  async findAll(options: any) {
    try {
      const datas = await this.prismaService.rawData.findMany({
        skip: (options.pageNumber - 1) * parseInt(options.pageSize), // Menghitung berapa data yang harus dilewati (skip)
        take: parseInt(options.pageSize), // Mengambil jumlah data sebanyak yang diinginkan (limit)
      });
      const count = await this.prismaService.rawData.count();
      return {
        data: datas,
        totalData: count,
        limit: options.pageSize,
        currentPage: options.pageNumber,
      };
    } catch (e) {
      throw new RpcException(new ConflictException('There was problem'));
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} raw`;
  }

  update(id: number, updateRawDto: UpdateRawDto) {
    return `This action updates a #${id} raw`;
  }

  remove(id: number) {
    return `This action removes a #${id} raw`;
  }
}
