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
          part_no: isThere.part_no,
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

  async dashboard() {
    const data: any = await this.prismaService.$queryRaw`SELECT
            COUNT(*) as total,
            SUM(CASE WHEN status = 'BERHASIL' THEN 1 ELSE 0 END) as success,
            SUM(CASE WHEN status = 'GAGAL' THEN 1 ELSE 0 END) as failed
        FROM history`;
    const data2: any = await this.prismaService.$queryRaw`SELECT
                                                              DATE_FORMAT(timestamp, '%Y-%m-%d') AS tanggal,
                                                              COUNT(*) as total,
                                                              SUM(CASE WHEN status = 'BERHASIL' THEN 1 WHEN status = 'GAGAL' THEN 1 ELSE 0 END) as total_success_failed
                                                          FROM history
                                                          WHERE timestamp >= DATE_SUB(CURDATE(), INTERVAL 14 DAY)
                                                          GROUP BY DATE_FORMAT(timestamp, '%Y-%m-%d')
                                                          ORDER BY tanggal DESC`;
    const data3 = await this.prismaService.history.findMany({
      orderBy: {
        timestamp: 'desc',
      },
      take: 10,
    });

    const formattedData = {
      total: Number(data[0].total),
      success: Number(data[0].success),
      failed: Number(data[0].failed),
    };
    const formattedDailyData = data2.map((entry: any) => ({
      Date: entry.tanggal,
      total: Number(entry.total),
      // total_success_failed: entry.total_success_failed,
    }));

    return {
      all: formattedData,
      daily: formattedDailyData,
      lastTen: data3,
    };
  }
}
