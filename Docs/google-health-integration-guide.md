# Google Health API integratie — stap voor stap

Vervangt de oude Fitbit Web API (sunset september 2026).  
Werkt met Fitbit, Pixel Watch en andere Google Health apparaten.

---

## Wat je nodig hebt

- De app gehost op GitHub Pages: `https://jeroentjj.github.io/helder`
- Een Google account (hetzelfde als je Fitbit/Google account)
- 15 minuten

---

## Stap 1 — Google Cloud project aanmaken

1. Ga naar [console.cloud.google.com](https://console.cloud.google.com)
2. Klik bovenaan op **Project selecteren → Nieuw project**
3. Naam: `Helder` → klik **Maken**
4. Wacht tot het project aangemaakt is

---

## Stap 2 — Google Health API inschakelen

1. Ga naar **APIs & Services → Bibliotheek**
2. Zoek op `Google Health API`
3. Klik op het resultaat → **Inschakelen**

---

## Stap 3 — OAuth toestemmingsscherm instellen

1. Ga naar **APIs & Services → OAuth-toestemmingsscherm**
2. Gebruikerstype: **Extern** → **Maken**
3. Vul in:
   - App-naam: `Helder`
   - E-mailadres ondersteuning: jouw e-mail
   - Ontwikkelaar e-mailadres: jouw e-mail
4. Klik **Opslaan en doorgaan** (bij Scopes en Testgebruikers ook doorklicken)
5. Terug op het dashboard: status is **Testen** — dat is goed voor persoonlijk gebruik

---

## Stap 4 — Testgebruiker toevoegen

> ⚠️ Zolang de app in "Testen" staat (max. 100 gebruikers), moet je je eigen e-mail toevoegen.

1. Ga naar **OAuth-toestemmingsscherm → Testgebruikers**
2. Klik **+ Gebruikers toevoegen**
3. Voer je eigen Google-e-mailadres in (hetzelfde als je Fitbit/Google account)
4. **Opslaan**

---

## Stap 5 — OAuth 2.0 Client ID aanmaken

1. Ga naar **APIs & Services → Referenties**
2. Klik **+ Referenties maken → OAuth-client-ID**
3. Toepassingstype: **Webtoepassing**
4. Naam: `Helder Web`
5. Onder **Geautoriseerde redirect-URI's** → klik **+ URI toevoegen**:
   ```
   https://jeroentjj.github.io/helder/fitbit-callback.html
   ```
6. Klik **Maken**
7. Kopieer de **Client-ID** (ziet eruit als `12345678-abc123.apps.googleusercontent.com`)

> ⚠️ **Client Secret**: Google geeft ook een Client Secret. Helder gebruikt PKCE en heeft die **niet nodig** — bewaar het wel ergens veilig maar vul het **niet** in de app in.

---

## Stap 6 — Scopes toevoegen

1. Ga naar **APIs & Services → OAuth-toestemmingsscherm → Scopes bewerken**
2. Klik **Scopes toevoegen of verwijderen**
3. Zoek op `googlehealth` en voeg toe:
   - `googlehealth.health_metrics_and_measurements.readonly`
   - `googlehealth.sleep.readonly`
   - `googlehealth.activity_and_fitness.readonly`
4. **Bijwerken** → **Opslaan**

---

## Stap 7 — Verbinden in Helder

1. Open `https://jeroentjj.github.io/helder`
2. Ga naar **Instellingen → Google Health**
3. Plak je Client ID
4. Klik op **Verbind Google Health**
5. Log in met je Google account en geef toestemming

Je wordt teruggestuurd naar Helder. Klaar. ✅

---

## Wat Helder uitleest

| Data | Endpoint | Gebruik |
|------|----------|---------|
| Rusthartslag | `daily-resting-heart-rate` | Context bij stemming-logs |
| Slaap duur | `sleep` (reconcile) | Correlatie met stemming volgende dag |
| HRV | `daily-heart-rate-variability` | Stressindicator (komende versie) |

---

## Technische flow (PKCE)

```
1. Helder genereert:
   code_verifier = 64 random bytes (opgeslagen in sessionStorage)
   code_challenge = base64url(SHA-256(code_verifier))

2. Redirect naar Google:
   https://accounts.google.com/o/oauth2/v2/auth
     ?client_id=JOUW_CLIENT_ID
     &redirect_uri=https://jeroentjj.github.io/helder/fitbit-callback.html
     &response_type=code
     &scope=googlehealth.health_metrics...
     &code_challenge=...
     &code_challenge_method=S256
     &access_type=offline
     &prompt=consent

3. Google stuurt terug naar fitbit-callback.html:
   ?code=AUTORISATIECODE&state=...

4. fitbit-callback.html wisselt code voor tokens:
   POST https://oauth2.googleapis.com/token
     code=...
     code_verifier=...  ← geen client_secret nodig met PKCE
     client_id=...
     grant_type=authorization_code

5. Tokens opgeslagen in localStorage:
   helder_gh_tokens = { access_token, refresh_token, expires_at }
```

---

## Privacy

- Tokens staan alleen in **jouw browser** (localStorage)
- Data wordt **niet** doorgestuurd naar Anthropic of een andere server
- De AI Coach ontvangt alleen anonieme statistieken (geen gezondheidsdata)
- Ontkoppelen via **Instellingen → Google Health ontkoppelen**
- Google-toegang intrekken via [myaccount.google.com/permissions](https://myaccount.google.com/permissions)

---

## Veelgestelde vragen

**Moet ik betalen voor Google Cloud?**  
Nee. De Google Health API is gratis voor persoonlijk gebruik (onder de quota).

**Werkt het ook zonder Fitbit-horloge?**  
Ja, ook met Pixel Watch of andere Google Health-compatibele apparaten.

**Wat als ik meer dan 100 gebruikers wil ondersteunen?**  
Dan is een security review via het CASA-framework vereist. Voor persoonlijk gebruik is dat niet nodig.

**Wanneer stopt de oude Fitbit Web API?**  
September 2026. Helder gebruikt al de nieuwe Google Health API.
