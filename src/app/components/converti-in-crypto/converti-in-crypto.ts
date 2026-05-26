
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-converti-in-crypto',
  imports: [CommonModule, FormsModule],
  templateUrl: './converti-in-crypto.html',
  styleUrl: './converti-in-crypto.css',
})
export class ConvertiInCrypto implements OnInit {
  // Supported cryptocurrencies by Binance API
  private readonly SUPPORTED_CRYPTOS = ['BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'SOL', 'DOGE', 'USDT', 'USDC', 'LINK', 'MATIC', 'AVAX', 'ATOM', 'HBAR', 'PEPE'];
  
  accountId: number | null = null;
  target: string = '';
  currencies: string[] = [];
  result: any = null;
  resultDisplay: string | null = null;
  loading = false;
  error: string | null = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.api.getCurrencies().subscribe({ 
      next: (res:any) => { 
        const allCurrencies = Array.isArray(res)
          ? res.map((r:any)=> this.normalizeCurrency(r?.name ?? r))
          : [];
        this.currencies = allCurrencies.filter(c => this.SUPPORTED_CRYPTOS.includes(c));
        if (this.currencies.length === 0) {
          this.currencies = this.SUPPORTED_CRYPTOS;
        }
        this.cdr.markForCheck();
      }, 
      error: () => { this.currencies = this.SUPPORTED_CRYPTOS; this.cdr.markForCheck(); } 
    });
  }

  convert() {
    this.error = null;
    this.resultDisplay = null;

    const accountId = Number(this.accountId);
    const target = this.normalizeCurrency(this.target);

    if (!accountId || isNaN(accountId) || accountId <= 0) {
      this.error = 'Inserisci un ID conto valido.';
      return;
    }

    if (!target) {
      this.error = 'Seleziona una criptovaluta di destinazione.';
      return;
    }

    if (!this.isSupportedCrypto(target)) {
      this.error = `${target} non è una criptovaluta supportata. Supportate: ${this.SUPPORTED_CRYPTOS.join(', ')}`;
      return;
    }

    this.loading = true;
    this.result = null;

    this.api.convertCrypto(accountId, target).subscribe({ 
      next: (res:any) => {
        this.result = res;
        this.resultDisplay = this.formatConversionResult(res, target);
        this.loading = false;
        this.cdr.markForCheck();
      }, 
      error: (e:any) => {
        this.error = this.extractApiError(e) || 'Errore durante la conversione.';
        this.resultDisplay = null;
        this.loading = false;
        this.cdr.markForCheck();
      } 
    });
  }

  private formatConversionResult(res: any, targetSymbol: string) {
    // Common response shapes handled gracefully
    try {
      if (!res) return '';
      if (res.from_currency && res.to_currency && (res.original_balance != null || res.converted_balance != null)) {
        return `${this.fmt(res.original_balance)} ${res.from_currency} → ${this.fmt(res.converted_balance)} ${res.to_currency}`;
      }
      // case: { original: { amount, currency }, converted: { amount, currency } }
      if (res.original && res.converted) return `${this.fmt(res.original.amount)} ${res.original.currency} → ${this.fmt(res.converted.amount)} ${res.converted.currency}`;
      // case: { from: {...}, to: {...} }
      if (res.from && res.to) return `${this.fmt(res.from.amount)} ${res.from.currency || ''} → ${this.fmt(res.to.amount)} ${res.to.currency || targetSymbol}`;
      // case: { balance, currency, converted: { amount, currency } }
      if ((res.balance || res.amount) && (res.converted || res.to)) {
        const a = res.balance ?? res.amount;
        const ca = res.currency ?? res.fromCurrency ?? '';
        const b = (res.converted && (res.converted.amount ?? res.converted.balance)) ?? (res.to && (res.to.amount ?? res.to.balance));
        const cb = (res.converted && (res.converted.currency)) ?? (res.to && res.to.currency) ?? targetSymbol;
        if (b != null) return `${this.fmt(a)} ${ca} → ${this.fmt(b)} ${cb}`;
      }
      // fallback: try to find two numeric values and a currency string
      const vals = Object.values(res ?? {}).flatMap((v: any) => (typeof v === 'object' && v != null ? Object.values(v) : [v]));
      const nums = vals.filter(v => typeof v === 'number');
      const strs = vals.filter(v => typeof v === 'string' && /[A-Za-z]{2,5}/.test(v));
      if (nums.length >= 2) return `${this.fmt(nums[0])} ${strs[0] ?? ''} → ${this.fmt(nums[1])} ${strs[1] ?? targetSymbol}`;
      // last resort: show a minimal JSON-ish string but compact
      return typeof res === 'string' ? res : JSON.stringify(res);
    } catch (e) {
      return JSON.stringify(res);
    }
  }

  private normalizeCurrency(value: any): string {
    const text = String(value ?? '').trim();
    return text ? text.toUpperCase() : '';
  }

  private isSupportedCrypto(value: string): boolean {
    return this.SUPPORTED_CRYPTOS.includes(this.normalizeCurrency(value));
  }

  private extractApiError(e: any): string | null {
    if (!e) return null;
    if (typeof e === 'string') return e;
    if (e?.error?.message) return e.error.message;
    if (e?.error?.error) return e.error.error;
    if (e?.error?.msg) return e.error.msg;
    if (e?.message) return e.message;
    return null;
  }

  private fmt(v: any) {
    if (v == null) return '';
    let candidate: any = v;
    if (typeof candidate === 'string') {
      const hasComma = candidate.includes(',');
      const hasDot = candidate.includes('.');
      if (hasComma && hasDot) {
        candidate = candidate.replace(/\./g, '').replace(',', '.');
      } else if (hasComma) {
        candidate = candidate.replace(',', '.');
      }
    }
    const n = Number(candidate);
    if (isNaN(n)) return String(v);
    return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 });
  }
}
