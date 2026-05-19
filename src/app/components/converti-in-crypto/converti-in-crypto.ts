
import { Component, OnInit } from '@angular/core';
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
  accountId: number | null = null;
  target: string = '';
  currencies: string[] = [];
  result: any = null;
  loading = false;
  error: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCurrencies().subscribe({ next: (res:any) => { this.currencies = Array.isArray(res) ? res.map((r:any)=> r.name ?? r) : []; }, error: () => { this.currencies = []; } });
  }

  convert() {
    if (!this.accountId || !this.target) { this.error = 'Select account and target'; return; }
    this.loading = true; this.error = null; this.result = null;
    this.api.convertCrypto(this.accountId, this.target).subscribe({ next: (res:any) => { this.result = res; this.loading = false; }, error: (e:any) => { this.error = e?.message || 'Conversion error'; this.loading = false; } });
  }
}
