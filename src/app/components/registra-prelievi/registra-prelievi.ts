
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-registra-prelievi',
  imports: [CommonModule, FormsModule],
  templateUrl: './registra-prelievi.html',
  styleUrl: './registra-prelievi.css',
})
export class RegistraPrelievi {
  accountId: number | null = null;
  amount: number | null = null;
  description = '';
  loading = false;
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  submit() {
    if (!this.accountId || !this.amount || this.amount <= 0) {
      this.message = 'Inserisci account id e amount > 0';
      return;
    }
    this.loading = true;
    this.message = null;
    this.api.withdrawal(this.accountId, this.amount, this.description).subscribe({
      next: (res: any) => {
        this.message = 'Withdrawal registrato';
        this.messageType = 'success';
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        // Map common HTTP errors to friendly messages
        let msg = 'errore: si è verificato un errore';
        if (err?.status === 400) msg = 'errore: saldo insufficiente';
        else if (err?.status === 404) msg = 'errore: conto non trovato';
        else if (err?.status === 409) msg = 'errore: richiesta in conflitto';
        else if (err?.error?.message) msg = err.error.message;
        else if (err?.error?.error) msg = err.error.error;
        this.message = msg;
        this.messageType = 'error';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

}
