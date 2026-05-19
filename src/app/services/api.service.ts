import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // Cambia l'URL se il backend è esposto su un'altra porta/host
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/account`);
  }

  getCurrencies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/currency`);
  }

  getTransactions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trans`);
  }

  getBalance(id_account: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/account/${id_account}/balance`);
  }

  convertFiat(id_account: number, params?: { to?: string }): Observable<any> {
    let p = new HttpParams();
    if (params?.to) p = p.set('to', params.to);
    return this.http.get(`${this.baseUrl}/account/${id_account}/balance/convert/fiat`, { params: p });
  }

  convertCrypto(id_account: number, params?: { to?: string }): Observable<any> {
    let p = new HttpParams();
    if (params?.to) p = p.set('to', params.to);
    return this.http.get(`${this.baseUrl}/account/${id_account}/balance/convert/crypto`, { params: p });
  }

  getAccountTransactions(id_account: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/account/${id_account}/transaction`);
  }

  getTransaction(id_account: number, id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/account/${id_account}/transaction/${id}`);
  }

  deposit(id_account: number, body: { amount: number; description?: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/account/${id_account}/deposit`, body);
  }

  withdraw(id_account: number, body: { amount: number; description?: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/account/${id_account}/withdrawal`, body);
  }

  editDescription(id_account: number, id: number, description: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/account/${id_account}/transaction/${id}`, { description });
  }

  deleteTransaction(id_account: number, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/account/${id_account}/transaction/${id}`);
  }
}
