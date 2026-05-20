
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
  loading = false;
  error: string | null = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.api.getCurrencies().subscribe({ next: (res: any) => { this.currencies = Array.isArray(res) ? res.map((r:any)=> r.name ?? r) : []; this.cdr.markForCheck(); }, error: () => { this.currencies = []; this.cdr.markForCheck(); } });
  }

  convert() {
    if (!this.accountId || !this.targetCurrency) { this.error = 'Select account and target currency'; return; }
    this.loading = true; this.error = null; this.result = null;
    this.api.convertFiat(this.accountId, this.targetCurrency).subscribe({ next: (res:any) => { this.result = res; this.loading = false; this.cdr.markForCheck(); }, error: (e:any) => { this.error = e?.message || 'Conversion error'; this.loading = false; this.cdr.markForCheck(); } });
  }
}
