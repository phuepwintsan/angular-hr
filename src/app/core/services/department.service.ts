import { Injectable } from '@angular/core';
import { RootModel } from '../models/root.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrDepartments`;
    return this.http.get<RootModel>(url);
  }

  getByDid(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrDepartments/by-departmentId?id=${id}`;
    return this.http.get<RootModel>(url);
  }

  getByCBid(companyId: string, branchId: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrDepartments/by-CBid?companyid=${companyId}&branchid=${branchId}`;
    return this.http.get<RootModel>(url);
  }

  getByName(
    name: string,
    companyId: string,
    branchId: number
  ): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrDepartments/byName?deptName=${name}&companyId=${companyId}&branchId=${branchId}`;
    return this.http.get<RootModel>(url);
  }
}
