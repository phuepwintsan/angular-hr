import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, Observer } from 'rxjs';
import { RootModel } from '../models/root.model';
import { environment } from '../../../environments/environment';
import { ViPositionModel } from '../models/position.model';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPositions`;
    return this.http.get<RootModel>(url);
  }

  getByCBDid(
    companyid: string,
    branchid: number,
    deptId: number
  ): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPositions/by-CBDid?companyid=${companyid}&branchid=${branchid}&deptId=${deptId}`;
    return this.http.get<RootModel>(url);
  }

  getByPid(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPositions/${id}`;
    return this.http.get<RootModel>(url);
  }

  create(model: ViPositionModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPositions`;
    return this.http.post<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  update(id: number, model: ViPositionModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPositions/${id}`;
    return this.http.put<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  delete(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPositions/${id}`;
    return this.http.delete<RootModel>(url);
  }
}
