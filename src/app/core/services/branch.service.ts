import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { environment } from '../../../environments/environment';
import { BranchModel } from '../models/branch.model';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrBranches`;
    return this.http.get<RootModel>(url);
  }

  create(model: BranchModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrBranches`;
    return this.http.post<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getById(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrBranches/${id}`;
    return this.http.get<RootModel>(url);
  }

  update(id: number, model: BranchModel): Observable<RootModel> {
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
