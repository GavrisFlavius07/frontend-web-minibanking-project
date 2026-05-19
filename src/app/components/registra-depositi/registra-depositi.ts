
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-registra-depositi',
  imports: [CommonModule, FormsModule],
  templateUrl: './registra-depositi.html',
  styleUrl: './registra-depositi.css',
})
export class RegistraDepositi {
  accountId: number | null = null;
  amount: number | null = null;
  description = '';
  loading = false;
  message: string | null = null;

  constructor(private api: ApiService) {}

  submit() {
    if (!this.accountId || !this.amount || this.amount <= 0) {
      this.message = 'Inserisci account id e amount > 0';
      return;
    }
    this.loading = true;
    this.message = null;
    this.api.deposit(this.accountId, this.amount, this.description).subscribe({
      next: (res: any) => {
        this.message = 'Deposit registrato';
        this.loading = false;
      },
      error: (err: any) => {
        this.message = err?.message || 'Errore durante il deposit';
        this.loading = false;
      }
    });
  }

}
