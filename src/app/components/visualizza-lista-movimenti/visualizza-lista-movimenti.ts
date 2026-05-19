import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-visualizza-lista-movimenti',
  imports: [CommonModule, FormsModule],
  templateUrl: './visualizza-lista-movimenti.html',
  styleUrl: './visualizza-lista-movimenti.css',
})
export class VisualizzaListaMovimenti implements OnInit {
  accountId: number | null = null;
  transactions: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('selected_account');
    if (stored) {
      this.accountId = Number(stored);
      this.fetch();
    }
  }

  fetch() {
    if (!this.accountId) return;
    this.loading = true;
    this.error = null;
    this.api.getAccountTransactions(this.accountId).subscribe({
      next: (res: any) => {
        this.transactions = res || [];
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err?.message || 'Errore fetching transactions';
        this.loading = false;
      }
    });
  }
}
