import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, Observer } from 'rxjs';
import { RootModel } from '../models/root.model';
import { environment } from '../../../environments/environment';
import { PositionModel } from '../models/position.model';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor(private http: HttpClient) {}

  get(): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPositions`;
    return this.http.get<RootModel>(url);
  }

  create(model: PositionModel): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPositions`;
    return this.http.post<RootModel>(url, JSON.stringify(model), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getById(id: number): Observable<RootModel> {
    let url: string = `${environment.apiUrl}/api/HrPositions/${id}`;
    return this.http.get<RootModel>(url);
  }

  update(id: number, model: PositionModel): Observable<RootModel> {
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
