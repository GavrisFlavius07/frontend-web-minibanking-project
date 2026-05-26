
import { Component, ChangeDetectorRef } from '@angular/core';
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
  messageType: 'success' | 'error' | null = null;
  latestTransaction: any = null;
  transactionOptions: number[] = [];

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  fetch() {
    if (!this.accountId || !this.transactionId) { this.message = 'Inserisci account e transaction id'; this.messageType = 'error'; return; }
    this.loading = true; this.message = null; this.transaction = null;
    this.api.getTransaction(this.accountId, this.transactionId).subscribe({ next: (res:any) => { 
      this.transaction = res; this.loading = false; this.cdr.markForCheck(); 
    }, error: (e:any) => {
     this.message = e?.message || 'Errore fetching transaction'; this.messageType = 'error'; this.loading = false; this.cdr.markForCheck(); 
    } });
  }

  saveDescription() {
    if (!this.accountId || !this.transactionId || this.transaction == null) return;
    this.loading = true; this.message = null;
    this.api.editDescription(this.accountId, this.transactionId, this.transaction.description || '').subscribe({ next: () => {
       this.message = 'Descrizione aggiornata'; this.messageType = 'success'; this.loading = false; this.cdr.markForCheck(); 
      }, error: (e:any) => {
         this.message = e?.message || 'Errore update'; this.messageType = 'error'; this.loading = false; this.cdr.markForCheck(); 
        } });
  }

  deleteTransaction() {
    if (!this.accountId || !this.transactionId) return;
    // enforce deletion only for the latest transaction
    if (!this.latestTransaction || this.latestTransaction.id !== this.transactionId) {
      this.message = "errore: puoi eliminare solo l'ultima transazione";
      this.messageType = 'error';
      return;
    }
    if (!confirm('Delete transaction?')) return;
    this.loading = true; this.message = null;
    this.api.deleteTransaction(this.accountId, this.transactionId).subscribe({ next: () => {
       this.message = 'Transaction eliminata'; this.messageType = 'success'; this.transaction = null; this.loading = false; this.cdr.markForCheck(); 
      }, error: (e:any) => { this.message = e?.message || 'Errore delete'; this.messageType = 'error'; this.loading = false; this.cdr.markForCheck(); 
      } });
  }

  loadLatestTransaction() {
    if (!this.accountId) {
      this.message = 'Inserisci l\'ID conto prima';
      this.messageType = 'error';
      return;
    }
    this.loading = true; this.message = null; this.latestTransaction = null; this.transactionOptions = [];
    this.api.getTransactions(this.accountId).subscribe({ next: (res:any) => {
      const arr = Array.isArray(res) ? res : [];
      if (arr.length === 0) {
        this.message = 'Nessun movimento trovato per questo conto';
        this.messageType = 'error';
        this.loading = false; this.cdr.markForCheck();
        return;
      }
      const last = arr[arr.length - 1];
      this.latestTransaction = last;
      this.transactionOptions = [last.id];
      this.transactionId = last.id;
      this.message = `ID ultimo movimento selezionato: ${last.id}`;
      this.messageType = 'success';
      this.loading = false; this.cdr.markForCheck();
    }, error: (e:any) => { this.message = e?.message || 'Errore fetching transactions'; this.messageType = 'error'; this.loading = false; this.cdr.markForCheck(); } });
  }
}
