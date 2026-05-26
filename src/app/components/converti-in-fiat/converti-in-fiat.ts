
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-converti-in-fiat',
  imports: [CommonModule, FormsModule],
  templateUrl: './converti-in-fiat.html',
  styleUrl: './converti-in-fiat.css',
})
export class ConvertiInFiat implements OnInit {
  accountId: number | null = null;
  targetCurrency = '';
  currencies: string[] = [];
  result: any = null;
  resultDisplay: string | null = null;
  loading = false;
  error: string | null = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.api.getCurrencies().subscribe({ next: (res: any) => { this.currencies = Array.isArray(res) ? res.map((r:any)=> r.name ?? r) : []; this.cdr.markForCheck(); }, error: () => { this.currencies = []; this.cdr.markForCheck(); } });
  }

  convert() {
    if (!this.accountId || !this.targetCurrency) { this.error = 'Select account and target currency'; return; }
    this.loading = true; this.error = null; this.result = null;
    this.api.convertFiat(this.accountId, this.targetCurrency).subscribe({ next: (res:any) => { this.result = res; this.resultDisplay = this.formatConversionResult(res, this.targetCurrency); this.loading = false; this.cdr.markForCheck(); }, error: (e:any) => { this.error = e?.message || 'Conversion error'; this.resultDisplay = null; this.loading = false; this.cdr.markForCheck(); } });
  }

  private formatConversionResult(res: any, targetSymbol: string) {
    try {
      if (!res) return '';
      if (res.from_currency && res.to_currency && (res.original_balance != null || res.converted_balance != null)) {
        return `${this.fmt(res.original_balance)} ${res.from_currency} → ${this.fmt(res.converted_balance)} ${res.to_currency}`;
      }
      if (res.original && res.converted) return `${this.fmt(res.original.amount)} ${res.original.currency} → ${this.fmt(res.converted.amount)} ${res.converted.currency}`;
      if (res.from && res.to) return `${this.fmt(res.from.amount)} ${res.from.currency || ''} → ${this.fmt(res.to.amount)} ${res.to.currency || targetSymbol}`;
      if ((res.balance || res.amount) && (res.converted || res.to)) {
        const a = res.balance ?? res.amount;
        const ca = res.currency ?? res.fromCurrency ?? '';
        const b = (res.converted && (res.converted.amount ?? res.converted.balance)) ?? (res.to && (res.to.amount ?? res.to.balance));
        const cb = (res.converted && (res.converted.currency)) ?? (res.to && res.to.currency) ?? targetSymbol;
        if (b != null) return `${this.fmt(a)} ${ca} → ${this.fmt(b)} ${cb}`;
      }
      const vals = Object.values(res ?? {}).flatMap((v: any) => (typeof v === 'object' && v != null ? Object.values(v) : [v]));
      const nums = vals.filter(v => typeof v === 'number');
      const strs = vals.filter(v => typeof v === 'string' && /[A-Za-z]{2,5}/.test(v));
      if (nums.length >= 2) return `${this.fmt(nums[0])} ${strs[0] ?? ''} → ${this.fmt(nums[1])} ${strs[1] ?? targetSymbol}`;
      return typeof res === 'string' ? res : JSON.stringify(res);
    } catch (e) {
      return JSON.stringify(res);
    }
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
