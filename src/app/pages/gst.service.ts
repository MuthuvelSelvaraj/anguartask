import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GstService {
  private apiUrl = 'http://49.50.112.46:3002/gst/'; // Base URL for GST API

  constructor(private http: HttpClient) {}

  // Get the list of GSTs
  getGstList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}list`).pipe(
      catchError((error) => {
        console.error('Error fetching GST list:', error);
        throw error;
      })
    );
  }

  // Save a new GST
  saveGst(gst: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}gstsave`, gst, { headers }).pipe(
      catchError((error) => {
        console.error('Error saving GST:', error);
        throw error;
      })
    );
  }

  // Update an existing GST
  updateGst(gst: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}gstupdate`, gst, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating GST:', error);
        throw error;
      })
    );
  }

  // Delete a GST
  deleteGst(gstId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}gstdelete/${gstId}`).pipe(
      catchError((error) => {
        console.error('Error deleting GST:', error);
        throw error;
      })
    );
  }
}