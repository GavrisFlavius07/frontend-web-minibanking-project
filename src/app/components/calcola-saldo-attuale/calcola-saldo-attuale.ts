
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-calcola-saldo-attuale',
  imports: [CommonModule, FormsModule],
  templateUrl: './calcola-saldo-attuale.html',
  styleUrl: './calcola-saldo-attuale.css',
})
export class CalcolaSaldoAttuale {
  private readonly SUPPORTED_CRYPTOS = ['BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'SOL', 'DOGE', 'USDT', 'USDC', 'LINK', 'MATIC', 'AVAX', 'ATOM', 'HBAR', 'PEPE'];
  
  accountId: number | null = null;
  balance: any = null;
  loading = false;
  error: string | null = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  load() {
    if (!this.accountId) return;
    this.loading = true;
    this.error = null;
    this.api.getBalance(this.accountId).subscribe({ 
      next: (res:any) => { this.balance = res; this.loading = false; this.cdr.markForCheck(); }, 
      error: (e:any) => { this.error = e?.message || 'Errore'; this.loading = false; this.cdr.markForCheck(); } 
    });
  }

  convertFiat(to?: string) {
    if (!this.accountId || !to) return;
    this.loading = true;
    this.api.convertFiat(this.accountId, to).subscribe({ 
      next: (res:any) => { this.balance = res; this.loading = false; this.cdr.markForCheck(); }, 
      error: (e:any) => { this.error = e?.message || 'Errore convert fiat'; this.loading = false; this.cdr.markForCheck(); } 
    });
  }

  convertCrypto(to?: string) {
    if (!this.accountId || !to) return;
    if (!this.SUPPORTED_CRYPTOS.includes(to)) {
      this.error = `${to} is not a supported cryptocurrency. Supported: ${this.SUPPORTED_CRYPTOS.join(', ')}`;
      return;
    }
    this.loading = true;
    this.api.convertCrypto(this.accountId, to).subscribe({ 
      next: (res:any) => { this.balance = res; this.loading = false; this.cdr.markForCheck(); }, 
      error: (e:any) => { 
        let errorMsg = 'Errore convert crypto';
        if (e?.error?.error) errorMsg = e.error.error;
        if (e?.error?.msg) errorMsg = e.error.msg;
        this.error = errorMsg;
        this.loading = false;
        this.cdr.markForCheck();
      } 
    });
  }
}
