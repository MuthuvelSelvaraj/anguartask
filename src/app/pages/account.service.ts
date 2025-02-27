import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = 'http://49.50.112.46:3002/account';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`);
  }

  getAccountById(accountId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${accountId}`);
  }

  saveAccount(accountData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/accountsave`, accountData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  updateAccount(accountData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/accountupdate`, accountData);
  }

  deleteAccount(accountId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/accountdelete/${accountId}`);
  }
}
