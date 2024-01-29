import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from 'nestjs-prisma';
import { CheckHistoryDto } from './dto/check-history.dto';

@Injectable()
export class HistoriesService {
  constructor(private prismaService: PrismaService) {}
  async create(createHistoryDto: CreateHistoryDto) {
    try {
      const isThere = await this.prismaService.rawData.findFirst({
        where: {
          po_id: createHistoryDto.po_id,
        },
      });
      // const isSubmitted = await this.prismaService.history.findMany({
      //   where: {
      //     status: 'BERHASIL',
      //     po_id: createHistoryDto.po_id,
      //     po_no: isThere.po_no,
      //     part_no: createHistoryDto.part_no,
      //   },
      // });
      if (!isThere) {
        throw new RpcException(
          new ConflictException('Kode PO ID Tidak Ditemukan di Database'),
        );
      }
      // if (isSubmitted.length > 0) {
      //   throw new RpcException(
      //     new ConflictException('Kode PO ID Ini Sudah Di Input'),
      //   );
      // }
      // const isNotSubmitted = await this.prismaService.history.findMany({
      //   where: {
      //     status: 'BERHASIL',
      //     po_number: createHistoryDto.po_number,
      //     parts_number: createHistoryDto.parts_number,
      //   },
      // });
      // if (isNotSubmitted.length > 0) {
      //   throw new RpcException(
      //     new ConflictException('Kode Part Number Ini Sudah Di Input'),
      //   );
      // }
      return this.prismaService.history.create({
        data: {
          po_id: createHistoryDto.po_id,
          part_no: createHistoryDto.part_no,
          po_no: isThere.po_no,
          status: 'BERHASIL',
          operator: createHistoryDto.operator,
          timestamp: new Date(),
        },
      });
    } catch (e) {
      Logger.log(e);
      throw e ?? new RpcException(new ConflictException('There was problem'));
    }
  }

  async findAll(options: any) {
    try {
      let datas = [];
      if (options.pageNumber > 0) {
        datas = await this.prismaService.history.findMany({
          skip: (options.pageNumber - 1) * parseInt(options.pageSize), // Menghitung berapa data yang harus dilewati (skip)
          take: parseInt(options.pageSize), // Mengambil jumlah data sebanyak yang diinginkan (limit)
        });
      } else {
        datas = await this.prismaService.history.findMany();
      }
      const count = await this.prismaService.history.count();
      return {
        data: datas,
        totalData: count,
        limit: options.pageSize ?? 100,
        currentPage: options.pageNumber ?? 1,
      };
    } catch (e) {
      throw new RpcException(new ConflictException('There was problem'));
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} history`;
  }

  async createFailed(createHistoryDto: CreateHistoryDto) {
    try {
      const isThere = await this.prismaService.rawData.findFirst({
        where: {
          po_id: createHistoryDto.po_id,
        },
      });
      if (!isThere) {
        throw new RpcException(
          new ConflictException('Kode PO ID Tidak Ditemukan di Database'),
        );
      }
      return this.prismaService.history.create({
        data: {
          po_id: createHistoryDto.po_id,
          part_no: createHistoryDto.part_no,
          po_no: isThere.po_no,
          status: 'GAGAL',
          operator: createHistoryDto.operator,
          timestamp: new Date(),
        },
      });
    } catch (e) {
      throw e ?? new RpcException(new ConflictException('There was problem'));
    }
  }

  async checkHistory(checkHistory: CheckHistoryDto) {
    try {
      const data = await this.prismaService.rawData.findFirst({
        where: {
          po_id: checkHistory.po_id,
        },
      });
      if (!data) {
        throw new RpcException(
          new ConflictException('PO ID Tidak Ditemukan di Database'),
        );
      }
      return {
        message: 'Data Ditemukan',
        part_no: data.part_no,
        barcode: data.barcode,
        part_id: data.id_part,
      };
    } catch (e) {
      throw e ?? new RpcException(new ConflictException('There was problem'));
    }
  }
}
