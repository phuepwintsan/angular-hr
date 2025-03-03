import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { environment } from '../../../environments/environment';
import { ViBranchModel } from '../models/branch.model';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrBranches`;
    return this.http.get<RootModel>(url);
  }

  create(model: ViBranchModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrBranches`;
    return this.http.post<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getByBid(branchId: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrBranches/by-branchid?id={branchId}`;
    return this.http.get<RootModel>(url);
  }

  getByCid(companyId: string): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrBranches/by-companyId?companyId=${companyId}`;
    return this.http.get<RootModel>(url);
  }

  update(id: number, model: ViBranchModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrBranches`;
    return this.http.put<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  delete(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrBranches/${id}`;
    return this.http.delete<RootModel>(url);
  }
}
