import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootModel } from '../models/root.model';
import { environment } from '../../../environments/environment';
import { ViCompanyModel } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrCompanies`;
    return this.http.get<RootModel>(url);
  }

  getByCId(companyId: string): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrCompanies/by-companyid?id=${companyId}`;
    return this.http.get<RootModel>(url);
  }

  create(model: ViCompanyModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrCompanies`;
    return this.http.post<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getById(id: string): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrCompanies/${id}`;
    return this.http.get<RootModel>(url);
  }

  update(id: string, model: ViCompanyModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrCompanies/${id}`;
    return this.http.put<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  delete(id: string): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrCompanies/${id}`;
    return this.http.delete<RootModel>(url);
  }
}
