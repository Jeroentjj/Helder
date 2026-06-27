# helder 🌿

**Stemming & interactietracker voor mensen met ADHD**

Een zelfstandige web-app voor het bijhouden van stemmingen, interacties en patronen — gebaseerd op CGT/CBT-principes. Alles draait in de browser, niets wordt opgeslagen op een server.

👉 **[Open de app](https://jeroentjj.github.io/helder)** · **[Bekijk de demo](https://jeroentjj.github.io/helder/demo)**

---

## Functies

- **Snel loggen** — interactietype, met wie, stemming voor/na op een schaal van 1–10
- **Stemming-ring** — visueel kleur-gebaseerd overzicht van je dagelijkse stemming
- **30-dagen inzichten** — patronen per type, persoon, dagdeel en weekdag
- **AI Coach** — persoonlijk CGT-advies op basis van jouw data, via Claude
- **Spraak-reflectie** — dagafsluiting inspreken, Claude vat samen
- **Gedachtenrecord** — 6-staps CGT-werkblad voor zware momenten
- **Beloningssysteem** — XP, levels en streaks voor dagelijkse betrokkenheid
- **Herinneringen** — pushnotificaties op vaste tijden (ochtend, lunch, middag, avond)
- **Volledig privé** — alle data blijft lokaal in je browser (localStorage)

---

## Installatie & gebruik

### Optie 1 — Direct openen (geen installatie)
Download `index.html` en open het in Chrome of Safari. Klaar.

> ⚠️ Spraakherkenning en notificaties werken alleen vanuit een echte URL (niet `file://`). Gebruik GitHub Pages of een lokale server voor alle functies.

### Optie 2 — GitHub Pages (aanbevolen)
1. Fork deze repo
2. Ga naar **Settings → Pages → Source: main branch / root**
3. De app is beschikbaar op `https://jeroentjj.github.io/helder`

### Optie 3 — Lokale server
```bash
cd helder
python3 -m http.server 8080
# Open http://localhost:8080
```

---

## Google Health integratie

Helder gebruikt de **Google Health API** — de opvolger van de Fitbit Web API (sunset september 2026). Werkt met Fitbit, Pixel Watch en andere Google Health apparaten.

Vereist een gehoste URL (GitHub Pages). Volledige setup-handleiding: [docs/google-health-integration-guide.md](docs/google-health-integration-guide.md)

**Kort samengevat:**
1. Google Cloud project aanmaken op [console.cloud.google.com](https://console.cloud.google.com)
2. Google Health API inschakelen
3. OAuth 2.0 Client ID aanmaken (type: Webtoepassing)
4. Redirect URI instellen: `https://jeroentjj.github.io/helder/fitbit-callback.html`
5. Client ID invullen in Helder → Instellingen → Google Health

De app gebruikt **PKCE** — geen backend server of client secret nodig.

**Beschikbare Fitbit data:**
- Hartslag (per minuut / daggemiddelde)
- Slaap (duur, fases, score)
- HRV (hartslagvariabiliteit — stressindicator)
- Stappen / activiteit

---

## AI Coach

De Coach-tab gebruikt de [Anthropic Claude API](https://www.anthropic.com). Alleen anonieme statistieken worden verstuurd (geen namen, geen notities — alleen gemiddelden en tellingen). De API-aanroep gaat direct vanuit de browser.

Er is geen API-sleutel nodig — de app gebruikt de ingebouwde Anthropic browser-integratie.

---

## Privacy & beveiliging

| Wat | Waar opgeslagen |
|-----|----------------|
| Logboek, reflecties, XP | Jouw browser (localStorage) |
| Notificatie-instellingen | Jouw browser (localStorage) |
| AI Coach analyse | Anonieme stats → Claude API → antwoord → jouw browser |
| Namen, notities, persoonlijke data | **Nooit** verstuurd |

Je kunt alle data wissen via **Instellingen → Wis alle data**.

---

## Technische stack

- Vanilla HTML/CSS/JavaScript — geen frameworks, geen build-stap
- [Fraunces](https://fonts.google.com/specimen/Fraunces) + [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Google Fonts)
- Web Speech API (spraakherkenning)
- Web Notifications API (herinneringen)
- localStorage (data opslag)
- Anthropic Claude API (AI Coach & reflectie-samenvatting)

---

## Structuur

```
helder/
├── index.html        # Hoofd-app
├── demo.html         # Demo met 30 dagen voorbeelddata
├── README.md
└── docs/             # Documentatie & screenshots
```

---

## Roadmap

- [ ] Fitbit OAuth PKCE integratie
- [ ] Google Health import
- [ ] PWA (installeerbaar op telefoon)
- [ ] Export naar PDF voor therapeut
- [ ] Aangepaste interactietypes
- [ ] Donker thema optie
- [ ] Meerdere profielen

---

## Licentie

MIT — gebruik vrij, aanpassen mag, credits worden gewaardeerd.

---

*Gebouwd met ❤️ voor mensen met ADHD die meer inzicht willen in hun stemming en interacties.*
