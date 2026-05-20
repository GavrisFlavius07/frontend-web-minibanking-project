# Angular Frontend + PHP Backend Integration Guide

## ✅ What Was Updated

Your Angular frontend has been successfully configured to work with your PHP backend running on XAMPP (localhost:80).

### Modified Files:

1. **`src/app/app.config.ts`**
   - Added `provideHttpClient()` provider for the modern standalone API
   - This enables HTTP requests in your Angular app

2. **`src/app/services/api.service.ts`**
   - Changed `baseUrl` from empty string to `/api`
   - Uses the proxy pattern for development (cleaner CORS handling)

3. **`src/app/app.ts`**
   - Removed deprecated `HttpClientModule` import
   - Now using standalone component architecture properly

### Already Configured:

- **`proxy.conf.json`** - Proxies `/api/*` → `http://localhost:80`
- **`angular.json`** - Dev server already uses proxy configuration

---

## 🚀 How to Run

### Prerequisites:
- XAMPP running with PHP on port 80
- PHP backend files deployed to XAMPP (e.g., `C:\xampp\htdocs\backend\`)
- Node.js and npm installed

### Steps:

1. **Ensure XAMPP is Running**
   ```bash
   # Start XAMPP control panel and click "Start" on Apache
   ```

2. **Start the Angular Dev Server**
   ```bash
   npm start
   # or
   ng serve
   ```

3. **Access the App**
   - Open browser: `http://localhost:4200`
   - The app will automatically proxy API requests to `http://localhost:80`

---

## 📡 API Endpoints (Summary)

All endpoints are now accessible through the Angular frontend:

### Account Management
- `GET /account` → List all accounts
- `GET /currency` → List all currencies

### Balance Operations
- `GET /account/:id/balance` → Get current balance
- `GET /account/:id/balance/convert/fiat?to=EUR` → Convert to fiat currency
- `GET /account/:id/balance/convert/crypto?to=BTC` → Convert to crypto

### Transactions
- `GET /account/:id/transaction` → Get transaction history
- `GET /account/:id/transaction/:id` → Get single transaction
- `POST /account/:id/deposit` → Record a deposit
- `POST /account/:id/withdrawal` → Record a withdrawal
- `PUT /account/:id/transaction/:id` → Edit transaction description
- `DELETE /account/:id/transaction/:id` → Delete transaction

---

## 🔧 Troubleshooting

### CORS Issues
- If you get CORS errors, ensure the proxy is running (it should be with `npm start`)
- Check that `proxy.conf.json` and `angular.json` are properly configured

### API Calls Not Working
1. Check XAMPP is running
2. Verify backend is accessible at `http://localhost/account`
3. Check browser DevTools → Network tab for request details
4. Check browser console for error messages

### Port Already in Use
- If port 4200 is already taken, run: `ng serve --port 4201`
- If XAMPP port 80 is taken, change the proxy config and backend port

---

## 📝 Component Overview

| Component | Functionality |
|-----------|---------------|
| `HomeComponent` | Displays all accounts, allows selecting one |
| `CalcolaSaldoAttuale` | View balance and convert currencies |
| `ConvertiInFiat` | Convert account balance to fiat currency |
| `ConvertiInCrypto` | Convert account balance to crypto |
| `RegistraDepositi` | Record a deposit transaction |
| `RegistraPrelievi` | Record a withdrawal transaction |
| `VisualizzaListaMovimenti` | View transaction history |
| `VisualizzaDettagliMovimento` | View & edit individual transaction details |

---

## ✨ Build Status

✅ **Build successful** - No critical errors, only minor style warnings

The application is ready to use!
