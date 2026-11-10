# Giggling Home – Beispielseite

Statische, für GitHub Pages vorbereitete Designvorschau mit 26 echten Produkten aus dem Etsy-Shop GigglingHome und der Amazon-Autorenseite von Stefan Marx. Stand: 10. November 2026. Eine Auswahl, kein vollständiger Katalog.

## Vorschau

`index.html` im Browser öffnen. Dafür ist keine Installation erforderlich. Die Produktdaten werden aus `products.js` geladen, sodass auch die lokale Datei funktioniert. Bilder werden aktuell von Amazon und Etsy, Schriften von Google Fonts geladen. Für den öffentlichen Betrieb sind eigene lokale Bilddateien und lokal gespeicherte Schriften sinnvoll.

## Enthalten

- Produktwelten Punk for Kids und Kids
- Unterkategorien Malbücher, T-Shirts / Clothing und Poster
- Suche, Sortierung, kombinierbare Filter und Ergebniszähler
- Direkte Produktlinks zu Amazon oder Etsy, je nach Anbieter
- Responsive Darstellung und Tastaturbedienung
- Keine erfundenen Preise: Aktuelle Preise und Verfügbarkeit stehen im jeweiligen Shop

Die Zuordnung zu den Produktwelten ist ein redaktioneller Vorschlag. Originaltitel wurden teilweise für die Anzeige gekürzt. Produktbeschreibungen sind kurze redaktionelle Texte. Kalender, nicht mehr lieferbare Ausgaben und weitere Etsy-Produkte sind in dieser Beispielauswahl nicht enthalten.

## Auf GitHub Pages veröffentlichen

1. Neues GitHub-Repository erstellen.
2. Den gesamten Inhalt dieses Ordners einschließlich `.github/workflows/pages.yml` und `.nojekyll` in das Repository übernehmen. `index.html` muss in dessen Wurzel liegen.
3. Den Hauptbranch `main` nennen.
4. In Settings → Pages → Build and deployment die Quelle **GitHub Actions** wählen.
5. Nach dem nächsten Push oder einem manuellen Start des Workflows wird die Seite veröffentlicht.

Es wurde noch kein Repository angelegt und nichts auf GitHub veröffentlicht. Vor Veröffentlichung vollständige rechtliche Angaben ergänzen und die Produktauswahl sowie die Bildverwendung prüfen. Der Hinweis „Designvorschau“ auf der Seite macht den aktuellen Entwurfsstand sichtbar.

## Produkte ergänzen

`products.json` ist die zentrale Produktliste. Der vorhandene GitHub-Workflow erzeugt daraus vor jeder Veröffentlichung automatisch `products.js`. Für eine lokale Vorschau nach Datenänderungen ebenfalls `products.js` neu erzeugen:

```sh
python3 -c "import json,pathlib; pathlib.Path('products.js').write_text('window.PRODUCTS = '+json.dumps(json.loads(pathlib.Path('products.json').read_text()),ensure_ascii=False)+';',encoding='utf-8')"
```

Jedes Produkt hat diese Felder:

```json
{
  "id": "eindeutige-produkt-id",
  "title": "Produktname",
  "description": "Kurze Beschreibung",
  "image": "https://… oder assets/bild.jpg",
  "world": "kids",
  "category": "books",
  "format": "Paperback",
  "url": "https://www.amazon.com/dp/…",
  "shop": "Amazon"
}
```

`world`: `kids` oder `punk`. `category`: `books`, `clothing` oder `posters`.

## Dynamischer Katalog auf einer statischen Seite

Die Website kann statisch bleiben, während ihre Produktliste regelmäßig neu erstellt wird. Empfehlung:

1. Etsy: Aktive Angebote mit der offiziellen Etsy Open API abrufen. Dafür braucht es eine eingerichtete Etsy-App, einen API-Zugang und die Shop-ID. Zugangsdaten ausschließlich in GitHub Secrets speichern, niemals im Browsercode. Alle Seiten der API-Ergebnisse abrufen und nur nach vollständigem erfolgreichem Import den Katalog ersetzen. Die Kategorisierung sollte über feste Regeln oder bestätigte Zuordnungen erfolgen.
2. Amazon/KDP: Zunächst eine redaktionell gepflegte Liste mit ASINs, Titeln und eigenen Coverdateien nutzen. Das einmalige Auslesen der Autorenseite hat im Browser funktioniert; daraus ergibt sich keine Zusage für einen stabilen automatischen Import. Eine geeignete offizielle Amazon-Datenanbindung müsste separat nach Zugang und Nutzungsbedingungen geprüft werden.
3. GitHub Actions: Nach eingerichtetem Import kann ein geplanter Lauf die Daten z. B. täglich einlesen und die Seite direkt neu veröffentlichen. Bei Importfehlern bleibt der zuletzt erfolgreiche Stand erhalten. Der vorhandene Workflow veröffentlicht aktuell nur bei Änderungen oder manuellem Start; ein Zeitplan ist noch nicht aktiviert.

So bleibt die Seite schnell und ohne eigenen laufenden Server. Ein CMS wäre die nächste Option, wenn Produkte lieber in einer Oberfläche statt in einer Datei gepflegt werden sollen.

## Quellen

- Amazon-Autorenseite: https://www.amazon.com/stores/Stefan-Marx/author/B0HND8DPLK/allbooks
- Etsy-Shop: https://www.etsy.com/shop/GigglingHome
- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- Etsy API: https://developers.etsy.com/documentation/reference#operation/findAllActiveListingsByShop

## Prüfung

JavaScript-Syntax geprüft. Im Browser: 26 Produkte beim Start; Punk for Kids 8 Produkte; Punk + Poster 1 Produkt; Suche ohne Treffer zeigt Rücksetzfunktion; Rücksetzen stellt 26 Produkte wieder her. Desktopansicht und 390 Pixel breite Handyansicht geprüft, ohne horizontalen Überlauf. Keine fehlgeschlagenen Bilder bei der Browserprüfung. Externe Bild-URLs können sich künftig ändern.
