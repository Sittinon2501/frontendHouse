import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  private apiUrl = 'http://localhost:3000/house';

  constructor(private http: HttpClient) {}

  getAllHouses(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getHouseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createHouse(house: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, house);
  }

  updateHouse(id: number, house: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, house);
  }

  deleteHouse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
