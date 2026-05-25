
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

}
