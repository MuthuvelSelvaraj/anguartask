import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://49.50.112.46:3002/user'; // Base API URL

  constructor(private http: HttpClient) {}

  // Fetch user list
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`);
  }

  // Save user (FIXED URL)
  saveUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usersave`, userData);
  }

  // Delete multiple users
  deleteMultipleUsers(userIds: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/multipleuserdelete`, userIds);
  }

  // Delete a single user by ID
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/userdelete/${userId}`);
  }
}
