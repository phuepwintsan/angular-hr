import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { environment } from '../../../environments/environment';
import { DeductionModel, ViDeductionModel } from '../models/deduction.model';
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class DeductionService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Deductions`;
    return this.http.get<RootModel>(url);
  }

  create(model: DeductionModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Deductions`;
    return this.http.post<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getByCBDid(
    companyId: string,
    branchId: number,
    depId: number
  ): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Deductions/by-CBDPid?companyId=${companyId}&branchId=${branchId}&deptId=${depId}`;
    return this.http.get<RootModel>(url);
  }

  getById(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Deductions/by-Id?deductionId=${id}`;
    return this.http.get<RootModel>(url);
  }

  getByDeptId(deptId: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Deductions/by-deptId?deptId=${deptId}`;
    return this.http.get<RootModel>(url);
  }

  updateById(id: number, model: DeductionModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Deductions/${id}`;
    return this.http.put<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  deleteById(deptId: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/Deductions/${deptId}`;
    return this.http.delete<RootModel>(url);
  }
}
