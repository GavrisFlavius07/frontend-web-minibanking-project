
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
  // Supported cryptocurrencies by Binance API
  private readonly SUPPORTED_CRYPTOS = ['BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'SOL', 'DOGE', 'USDT', 'USDC', 'LINK', 'MATIC', 'AVAX', 'ATOM', 'HBAR', 'PEPE'];
  
  accountId: number | null = null;
  target: string = '';
  currencies: string[] = [];
  result: any = null;
  loading = false;
  error: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCurrencies().subscribe({ 
      next: (res:any) => { 
        const allCurrencies = Array.isArray(res) ? res.map((r:any)=> r.name ?? r) : [];
        // Filter to show only supported cryptocurrencies
        this.currencies = allCurrencies.filter(c => this.SUPPORTED_CRYPTOS.includes(c));
        // If no currencies match, show all supported as suggestions
        if (this.currencies.length === 0) {
          this.currencies = this.SUPPORTED_CRYPTOS;
        }
      }, 
      error: () => { this.currencies = this.SUPPORTED_CRYPTOS; } 
    });
  }

  convert() {
    if (!this.accountId || !this.target) { this.error = 'Select account and target'; return; }
    if (!this.SUPPORTED_CRYPTOS.includes(this.target)) { 
      this.error = `${this.target} is not a supported cryptocurrency. Supported: ${this.SUPPORTED_CRYPTOS.join(', ')}`; 
      return; 
    }
    this.loading = true; this.error = null; this.result = null;
    this.api.convertCrypto(this.accountId, this.target).subscribe({ 
      next: (res:any) => { this.result = res; this.loading = false; }, 
      error: (e:any) => { 
        // Try to extract API error message
        let errorMsg = 'Conversion error';
        if (e?.error?.error) errorMsg = e.error.error;
        if (e?.error?.msg) errorMsg = e.error.msg;
        this.error = errorMsg;
        this.loading = false; 
      } 
    });
  }
}
