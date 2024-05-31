import * as XLSX from 'xlsx';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExcelService {
  async readExcel(file: Express.Multer.File): Promise<any[]> {
    try {
      const fileBuffer = file.buffer;
      const workbook = XLSX.read(fileBuffer, {
        type: 'buffer',
        cellDates: true,
        raw: true,
      });
      const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet
      const worksheet = workbook.Sheets[sheetName];
      return XLSX.utils.sheet_to_json(worksheet);
    } catch (error) {
      throw new Error('Error reading Excel file: ' + error.message);
    }
  }
}