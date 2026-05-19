
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-visualizza-dettagli-movimento',
  imports: [CommonModule, FormsModule],
  templateUrl: './visualizza-dettagli-movimento.html',
  styleUrl: './visualizza-dettagli-movimento.css',
})
export class VisualizzaDettagliMovimento {
  accountId: number | null = null;
  transactionId: number | null = null;
  transaction: any = null;
  loading = false;
  message: string | null = null;

  constructor(private api: ApiService) {}

  fetch() {
    if (!this.accountId || !this.transactionId) { this.message = 'Inserisci account e transaction id'; return; }
    this.loading = true; this.message = null; this.transaction = null;
    this.api.getTransaction(this.accountId, this.transactionId).subscribe({ next: (res:any) => { this.transaction = res; this.loading = false; }, error: (e:any) => { this.message = e?.message || 'Errore fetching transaction'; this.loading = false; } });
  }

  saveDescription() {
    if (!this.accountId || !this.transactionId || this.transaction == null) return;
    this.loading = true; this.message = null;
    this.api.editDescription(this.accountId, this.transactionId, this.transaction.description || '').subscribe({ next: () => { this.message = 'Descrizione aggiornata'; this.loading = false; }, error: (e:any) => { this.message = e?.message || 'Errore update'; this.loading = false; } });
  }

  deleteTransaction() {
    if (!this.accountId || !this.transactionId) return;
    if (!confirm('Delete transaction?')) return;
    this.loading = true; this.message = null;
    this.api.deleteTransaction(this.accountId, this.transactionId).subscribe({ next: () => { this.message = 'Transaction eliminata'; this.transaction = null; this.loading = false; }, error: (e:any) => { this.message = e?.message || 'Errore delete'; this.loading = false; } });
  }
}
