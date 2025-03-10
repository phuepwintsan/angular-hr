import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { environment } from '../../../environments/environment';
import { RippleDesignTokens } from '@primeng/themes/types/ripple';
import { JobOpeningModel } from '../models/job-opening.model';

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
}
