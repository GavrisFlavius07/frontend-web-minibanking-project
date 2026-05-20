
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
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        this.message = err?.message || 'Errore durante il withdrawal';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

}
