import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(private api: ApiService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.api.getAccounts().subscribe({ next: (res: any) => { this.accounts = res || []; this.cdr.markForCheck(); }, error: () => { this.accounts = []; this.cdr.markForCheck(); } });
  }

  viewTransactions(account: any) {
    try { localStorage.setItem('selected_account', String(account.id)); } catch {}
    this.router.navigate(['/account/transaction']);
  }

}
