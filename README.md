# MiniBanking — Frontend Web

Questa applicazione è il front-end di una piccola demo di home banking: un'interfaccia web pensata per gestire un conto utente in modo semplice e didattico. Permette di registrare depositi e prelievi, visualizzare la lista dei movimenti, consultare i dettagli di ogni transazione, calcolare il saldo corrente e convertire importi tra valuta fiat e criptovalute.

**Per chi è pensata:** sviluppatori, studenti o chiunque desideri esplorare un esempio pratico di applicazione bancaria leggera costruita con Angular.

**Punti di forza:** interfaccia chiara, componenti separati per ogni funzionalità e un servizio API centralizzato per comunicare con il backend.

**Caratteristiche principali**
- **Lista movimenti:** visualizza cronologicamente tutte le operazioni (depositi/prelievi).
- **Dettaglio movimento:** mostra informazioni estese su una singola transazione.
- **Registra deposito:** form semplice per aggiungere un nuovo accredito.
- **Registra prelievo:** form per registrare un prelievo dal conto.
- **Calcolo saldo:** calcola il saldo corrente a partire dai movimenti registrati.
- **Conversione valute:** convertitore da/verso criptovalute e valute fiat.
- **Comunicazione API:** tutte le operazioni lato dati passano attraverso un servizio API centralizzato.

**Tecnologie**
- **Frontend:** Angular (CLI) — progetto generato con Angular CLI.
- **Testing:** configurazione per test unitari.

**Installazione e avvio (sviluppo)**
1. Assicurati di avere installati `Node.js` e `npm`.
2. Installa le dipendenze:

```bash
npm install
```

3. Avvia il server di sviluppo:

```bash
npm start
# oppure
ng serve
```

4. Apri il browser su `http://localhost:4200/`.

Nota: il progetto include `proxy.conf.json` per inoltrare le chiamate verso un backend di sviluppo. Consulta il file `BACKEND_SETUP.md` nella root del repository per le istruzioni sulla configurazione del backend.

**Struttura del progetto (panoramica)**
- **`src/app/components/visualizza-lista-movimenti/`**: componente che mostra l'elenco delle transazioni.
- **`src/app/components/visualizza-dettagli-movimento/`**: visualizza i dettagli di una singola operazione.
- **`src/app/components/registra-depositi/`**: form e logica per registrare depositi.
- **`src/app/components/registra-prelievi/`**: form e logica per registrare prelievi.
- **`src/app/components/calcola-saldo-attuale/`**: componente che calcola e mostra il saldo corrente.
- **`src/app/components/converti-in-crypto/`** e **`converti-in-fiat/`**: strumenti per la conversione di importi tra valute.
- **`src/app/services/api.service.ts`**: servizio centrale che gestisce le chiamate HTTP verso il backend.

Questa suddivisione mantiene la UI modulare e facilita lo sviluppo e i test delle singole funzionalità.

**Esecuzione dei test**
Per eseguire i test unitari:

```bash
npm test
```

**Build per produzione**

```bash
ng build --configuration production
```

Gli artefatti compilati saranno generati nella cartella `dist/`.

**Note sul backend**
- Se usi un'API separata, verifica `proxy.conf.json` per inoltrare le richieste durante lo sviluppo.
- Vedi `BACKEND_SETUP.md` per istruzioni su come avviare il backend di prova (endpoints, porte e richieste supportate).

**Contribuire**
- Segnala issue o apri una pull request per miglioramenti e fix.
- Mantieni il codice modulare e aggiungi test per le nuove funzionalità.

Se vuoi, posso generare anche una breve guida per il deploy o aggiungere esempi di chiamate API per i backend più comuni.

---
Aggiornato per presentare in modo chiaro le funzionalità e le modalità d'uso dell'applicazione.
