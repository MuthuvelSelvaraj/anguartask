import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://49.50.112.46:3002/city/';

  constructor(private http: HttpClient) {}

  // Get list of cities
  getCities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}list`);
  }

  // Save new city
  saveCity(city: any): Observable<any> {
    return this.http.post(`${this.apiUrl}citysave`, city);
  }

  // Update existing city
  updateCity(city: any): Observable<any> {
    return this.http.put(`${this.apiUrl}cityupdate`, city);
  }

  // Delete city
  deleteCity(cityId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}citydelete/${cityId}`);
  }
}
