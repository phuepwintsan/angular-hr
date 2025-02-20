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
}
