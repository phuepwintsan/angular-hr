import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { environment } from '../../../environments/environment';
import { RippleDesignTokens } from '@primeng/themes/types/ripple';
import { JobOpeningModel } from '../models/job-opening.model';
import { Nullable } from 'primeng/ts-helpers';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class JobOpeningService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/JobOpens`;
    return this.http.get<RootModel>(url);
  }

  getById(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/JobOpens/${id}`;
    return this.http.get<RootModel>(url);
  }

  getByCBDPid(
    companyId: string,
    branchId: number,
    deptId: number,
    positionId: number
  ): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/JobOpens/by-CBDP?companyid=${companyId}&branchid=${branchId}&deptId=${deptId}&positionId=${positionId}`;
    return this.http.get<RootModel>(url);
  }

  create(model: JobOpeningModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/JobOpens`;
    return this.http.post<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  updateById(id: number, model: JobOpeningModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/JobOpens/${id}`;
    return this.http.put<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  delete(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/JobOpens/${id}`;
    return this.http.delete<RootModel>(url);
  }

  public excel(fileName: string, element: Nullable<ElementRef>): void {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.table_to_sheet(element?.nativeElement);
      var range = xlsx.utils.decode_range(worksheet['!ref'] as string);
      for (var C = range.s.r; C <= range.e.c; ++C) {
        var address = xlsx.utils.encode_col(C) + '1'; // <-- first row, column number C
        if (!worksheet[address]) continue;
        worksheet[address].v = worksheet[address].v.toUpperCase();
      }
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, fileName);
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    saveAs(data, fileName + new Date().toLocaleDateString() + EXCEL_EXTENSION);
  }
}
