import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = ''; // oppure environment.apiUrl

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/account`);
  }

  getCurrencies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/currency`);
  }

  getBalance(id_account: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/account/${id_account}/balance`);
  }

  convertFiat(id_account: number, to: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/account/${id_account}/balance/convert/fiat`, { params: { to } });
  }

  convertCrypto(id_account: number, to: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/account/${id_account}/balance/convert/crypto`, { params: { to } });
  }

  getTransactions(id_account: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/account/${id_account}/transaction`);
  }

  getTransaction(id_account: number, id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/account/${id_account}/transaction/${id}`);
  }

  deposit(id_account: number, amount: number, description = ''): Observable<any> {
    const body = { amount, description };
    return this.http.post(`${this.baseUrl}/account/${id_account}/deposit`, body, this.jsonHeaders());
  }

  withdrawal(id_account: number, amount: number, description = ''): Observable<any> {
    const body = { amount, description };
    return this.http.post(`${this.baseUrl}/account/${id_account}/withdrawal`, body, this.jsonHeaders());
  }

  editDescription(id_account: number, id: number, description: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/account/${id_account}/transaction/${id}`, { description }, this.jsonHeaders());
  }

  deleteTransaction(id_account: number, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/account/${id_account}/transaction/${id}`);
  }

  private jsonHeaders() {
    return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }
}
