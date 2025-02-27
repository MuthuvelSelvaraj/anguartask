import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstanceService {
  private apiUrl = 'http://49.50.112.46:3002/instance'; // Base API URL

  constructor(private http: HttpClient) {}

  // Fetch all instances
  getInstances(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }

  // Create a new instance
  addInstance(instanceData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/instancesave`, instanceData);
  }

  // Update an existing instance
  updateInstance(instanceId: number, instanceData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/instanceupdate`, {
      id: instanceId,
      ...instanceData,
    });
  }

  // Delete an instance
  deleteInstance(instanceId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/instancedelete?id=${instanceId}`);
  }
}