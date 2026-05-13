// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { CalcolaSaldoAttuale } from './components/calcola-saldo-attuale/calcola-saldo-attuale';
import { ConvertiInCrypto } from './components/converti-in-crypto/converti-in-crypto';
import { ConvertiInFiat } from './components/converti-in-fiat/converti-in-fiat';
import { RegistraDepositi } from './components/registra-depositi/registra-depositi';
import { RegistraPrelievi } from './components/registra-prelievi/registra-prelievi';
import { VisualizzaDettagliMovimento } from './components/visualizza-dettagli-movimento/visualizza-dettagli-movimento';
import { VisualizzaListaMovimenti } from './components/visualizza-lista-movimenti/visualizza-lista-movimenti';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account/balance', component: CalcolaSaldoAttuale },
  { path: 'account/balance/convert/crypto', component: ConvertiInCrypto },
  { path: 'account/balance/convert/fiat', component: ConvertiInFiat },
  { path: 'account/deposit', component: RegistraDepositi },
  { path: 'account/withdrawal', component: RegistraPrelievi },
  { path: 'account/transaction/detail', component: VisualizzaDettagliMovimento },
  { path: 'account/transaction', component: VisualizzaListaMovimenti },  
  { path: '**', redirectTo: '' } 
];
