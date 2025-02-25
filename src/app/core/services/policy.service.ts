import { Injectable } from '@angular/core';
import { RootModel } from '../models/root.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PolicyModel } from '../models/policy.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPolicies`;
    return this.http.get<RootModel>(url);
  }

  create(model: PolicyModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPolicies`;
    return this.http.post<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getById(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPolicies/${id}`;
    return this.http.get<RootModel>(url);
  }

  update(id: number, model: PolicyModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPolicies/${id}`;
    return this.http.put<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  delete(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPolicies/${id}`;
    return this.http.delete<RootModel>(url);
  }
}
