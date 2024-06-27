import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateRawDto } from './dto/create-raw.dto';
import { UpdateRawDto } from './dto/update-raw.dto';
import { PrismaService } from 'nestjs-prisma';
import { RpcException } from '@nestjs/microservices';
import { ExcelService } from '../utils/excel.service';

@Injectable()
export class RawService {
  constructor(
    private prismaService: PrismaService,
    private excelService: ExcelService,
  ) {}

  async create(file: Express.Multer.File) {
    try {
      // Konversi format tanggal dan sesuaikan zona waktu untuk setiap objek dalam array
      const data = await this.excelService.readExcel(file);
      const transformedData = data.map((rowData: any) => ({
        po_id: rowData['PO ID'],
        date: rowData['Date'],
        delivery_date: rowData['Delivery Date'],
        part_no: rowData['Part No'],
        part_name: rowData['Part Name'],
        quantity: rowData['Quantity'] ?? 0,
        id_part:
          rowData['ID Part'] !== null && rowData['ID Part'] !== undefined
            ? rowData['ID Part'].toString()
            : '',
        barcode: rowData['Barcode'],
        receiving_area: rowData['reciving area'],
        po_no: rowData['PO No'],
        model: rowData['Model'],
        bagian_part: rowData['Bagian Part'],
        delivery_period:
          rowData['Del periode'] !== null &&
          rowData['Del periode'] !== undefined
            ? rowData['Del periode'].toString()
            : '',
      }));
      const formattedCreateRawDtos = transformedData.map((dto) => {
        return {
          ...dto,
        };
      });
      // Buat data di database menggunakan Prisma
      return this.prismaService.rawData.createMany({
        data: formattedCreateRawDtos,
      });
    } catch (e) {
      Logger.log('Logger bos: ' + e);
      throw new RpcException(new ConflictException('Raw Data was duplicate'));
    }
  }

  async findAll(pageNumber?: number, pageSize?: number) {
    try {
      const datas = await this.prismaService.rawData.findMany({
        skip: (pageNumber - 1) * parseInt(pageSize.toString()), // Menghitung berapa data yang harus dilewati (skip)
        take: parseInt(pageSize.toString()), // Mengambil jumlah data sebanyak yang diinginkan (limit)
      });
      const formattedDatas = datas.map((data) => ({
        ...data,
      }));
      const count = await this.prismaService.rawData.count();
      return {
        data: formattedDatas,
        totalData: count,
        limit: pageSize,
        currentPage: pageNumber,
      };
    } catch (e) {
      Logger.log(e);
      throw new RpcException(new ConflictException('There was problem'));
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} raw`;
  }

  // update(id: number, updateRawDto: UpdateRawDto) {
  //   return `This action updates a #${id} raw`;
  // }

  remove() {
    try {
      return this.prismaService.rawData.deleteMany({});
    } catch (e) {
      throw new RpcException(new ConflictException('There was problem'));
    }
  }
}
