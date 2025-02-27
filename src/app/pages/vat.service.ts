import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VatService {
  private apiUrl = 'http://49.50.112.46:3002/vat/'; // Base API URL

  constructor(private http: HttpClient) {}

  // Get list of VATs
  getVatList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}list`).pipe(
      catchError((error) => {
        console.error('Error fetching VAT list:', error);
        return throwError(() => new Error('Failed to fetch VAT list.'));
      })
    );
  }

  // Save new VAT
  saveVat(vat: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      vatid: vat.vatid,
      vatpercent: vat.vatpercent
    };

    return this.http.post(`${this.apiUrl}vatsave`, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error saving VAT:', error);
        return throwError(() => new Error('Failed to save VAT.'));
      })
    );
  }

  // Update existing VAT
  updateVat(vat: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      vatid: vat.vatid,
      vatpercent: vat.vatpercent
    };

    return this.http.put(`${this.apiUrl}vatupdate`, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating VAT:', error);
        return throwError(() => new Error('Failed to update VAT.'));
      })
    );
  }

  // Delete VAT by ID
  deleteVat(vatId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}vatdelete/${vatId}`).pipe(
      catchError((error) => {
        console.error('Error deleting VAT:', error);
        return throwError(() => new Error('Failed to delete VAT.'));
      })
    );
  }
}