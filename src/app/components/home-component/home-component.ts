import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home-component',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  accounts: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getAccounts().subscribe({ next: (res: any) => (this.accounts = res || []), error: () => (this.accounts = []) });
  }

  viewTransactions(account: any) {
    try { localStorage.setItem('selected_account', String(account.id)); } catch {}
    this.router.navigate(['/account/transaction']);
  }

}
