import { ElementRef, Injectable } from '@angular/core';
import { Nullable } from 'primeng/ts-helpers';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  public excel(fileName: string, element: Nullable<ElementRef>): void {
    if (!element?.nativeElement) {
      console.error('Invalid table element reference');
      return;
    }

    const worksheet = XLSX.utils.table_to_sheet(element.nativeElement);
    const range = XLSX.utils.decode_range(worksheet['!ref'] as string);

    // Loop through first row (headers) and convert them to uppercase
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_col(C) + '1'; // First row, column C
      if (!worksheet[address]) continue;
      worksheet[address].v = (worksheet[address].v as string).toUpperCase();
    }

    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });

    saveAs(
      data,
      `${fileName}_${new Date().toISOString().split('T')[0]}${EXCEL_EXTENSION}`
    );
  }
}
