# Giggle Home – Beispielseite

Statische, für GitHub Pages vorbereitete Designvorschau mit 35 echten Produkten aus dem Etsy-Shop GigglingHome und der Amazon-Autorenseite von Stefan Marx. Stand: 11. November 2026. Eine Auswahl, kein vollständiger Katalog.

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
python3 scripts/prepare_site.py
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

`world`: `kids` oder `punk`. `category`: `books`, `clothing`, `posters` oder `calendar`.

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

## Design-Überarbeitung

Navigation mit Amazon-Autorenseite https://amazon.com/author/giggle, originale Giggle-Home- und Rebels-Marken, dezenter durchgehender Papierhintergrund, geschlossene Produktkarten und neue Illustration im Abschlussbereich.

### Bildherkunft

- `assets/giggle-home-logo.png` und `assets/giggle-home-house.png`: vorhandene Markenbilder aus motifs/branding/gigglehome-v05-white-giggle, unverändert übernommen.
- `assets/giggle-punk.png`: Rebels-symbol-master aus dem Rebels-Buch, unverändert übernommen.
- `assets/giggle-home-creative-banner.png`: neu mit der integrierten Bildgenerierung erstellt, Hauslogo und Etsy-Banner als Referenzen.
- `assets/playful-pattern.svg`: dekoratives Hintergrundmuster.

Bildbriefing: Breites handgemaltes Kawaii-Banner auf cremefarbenem Papier; originales orange-blaues, zwinkerndes Giggle-Home-Haus in der Mitte, links ein malender Dumpling mit Malbuch und Buntstiften, rechts ein Dumpling mit T-Shirt sowie ein gerahmtes Fantasiedorf-Poster; keine Schrift, keine zusätzlichen Logos.

## Freigegebene Logo-Farbwelt

Variante 01: Salbei und Koralle mit Creme und dunkelbraunen Konturen. Header, Footer, Haus-Icon und Favicon verwenden die neuen transparenten Dateien `assets/giggle-home-logo-sage-coral.png` und `assets/giggle-home-house-sage-coral.png`. Mit integrierter Bildgenerierung aus dem freigegebenen Farbentwurf erstellt. Briefing: ausschließlich Variante 01 als transparentes einzelnes Logo bzw. Haus-Icon, ohne Beschriftungen und Farbkreise. Ursprüngliche Dateien bleiben erhalten. Das T-Shirt im Einstieg wird größer und mit engerem Bildausschnitt ohne zusätzlichen weißen Rahmen gezeigt.

## Weitere Shoplinks

Der Abschlussbereich verlinkt Etsy, Amazon und Spreadshop. Bei drei am 10.11.2026 im öffentlichen Spreadshop-Katalog bestätigten Motiven (Bedtime for Nobody, Washable Material und Mini Mischief) führt ein zweiter Link direkt zum jeweiligen Spreadshop-Motiv. Der dort angezeigte übersetzte Name für Mini Mischief lautet „Kleiner Schatz“; die Design-ID stimmt mit der dokumentierten Zuordnung überein. Weitere Motive erst nach bestätigter Verfügbarkeit über `spreadshopUrl` ergänzen. Produktkarten verwenden separate Geschwisterlinks, keine ineinander verschachtelten Links.

## Abgestimmte Seitenfarben

Salbei, Koralle, Creme und dunkles Braun ersetzen die lila Akzente. Die Laufzeile hat seitliche Innenabstände. Das Banner wurde mit integrierter Bildgenerierung an die freigegebene Logo-Palette angepasst (Hausdach Koralle, Seiten Salbei, Konturen Braun, übrige Komposition erhalten) und dient zusätzlich als dezenter Einstiegshintergrund. Datei: `assets/giggle-home-creative-banner-sage-coral.png`.

## Lockeres Textband und Häuschen-Icon

Das angehängte Schwarzweiß-Häuschen wurde mit integrierter Bildgenerierung als transparentes Icon mit braunen Linien und korallfarbenem Herz aufbereitet (`assets/happy-house-icon.png`). Briefing: Form und Gesicht des Referenzhauses erhalten, klare Linien, kein Hintergrund. Es ersetzt die Sterne im Einstieg und im hellen pfirsich-cremefarbenen Textband. Dessen Texte nutzen gemischte Groß-/Kleinschreibung und Baloo 2. Der transparente Schriftzug `assets/made-for-little-rebels.png` wurde aus dem Giggle-Home-Logo-Stil abgeleitet, mit dem exakten Text „made for little rebels ↗“, Creme, Salbei, Koralle und braunen Konturen.

## Aktualisierte Icons

Das bestätigte Häuschen ohne rotes Herz ist als `assets/happy-house-no-heart.png` in Einstieg und Textband eingebunden. Das Punk-Icon `assets/giggle-punk-coral.png` erhält ausschließlich korallfarbene Haare, farblich passend zum Hausdach; Gesicht und Linien bleiben wie zuvor. Bearbeitet mit integrierter Bildgenerierung mit dem Briefing, nur die Haarfüllung anhand des korallfarbenen Hausdachs zu ändern und Form, Gesicht und Transparenz zu erhalten.

## Etsy-Poster und Kalender vollständig

Am 10.11.2026 wurden alle 13 Artikel der Etsy-Shopkategorie „Poster“ und der eine Artikel aus „Calendar“ erfasst. Der Katalog enthält jetzt 34 Produkte: 13 Bücher, 7 Shirts, 13 Poster und 1 Kalender. Frühere digitale Poster-Beispiele sind durch die Auswahl aus „Poster“ ersetzt; „Poster-Digital“ wurde nicht importiert. Die Originaltitel und Shopkategorien bleiben als sourceTitle/sourceSection dokumentiert. Einige Originaltitel innerhalb der Shopkategorie „Poster“ erwähnen noch „Digital Download“; die Auswahl richtet sich ausdrücklich nach der vom Nutzer angegebenen Shopkategorie. Der Kalender besitzt einen eigenen Filter und ist in der Vorauswahl sichtbar.

## Deutsch / English

Die DE/EN-Auswahl im Header übersetzt Seitentexte, Filter, Suche, Sortierung, Shoplinks, Alternativtexte und Produktbeschreibungen. Buchtitel bleiben als Originaltitel erhalten; die tatsächliche Ausgabe (German/English/Spanish edition) steht in der Beschreibung. Die englische Kalenderbezeichnung ist separat hinterlegt. Marken-Schriftzüge und die englischen Sprüche im Bildband bleiben unverändert. Die Wahl wird lokal gespeichert und ist über `?lang=de` bzw. `?lang=en` teilbar. Ein Sprachwechsel erhält die aktiven Filter und den Suchtext.

## Cache-sichere Veröffentlichungen

Vor jedem Deployment erzeugt `scripts/prepare_site.py` die Produktdaten und versieht die CSS-/JavaScript-Verweise im HTML mit inhaltsbasierten Versionskennungen. Dadurch lädt Safari nach Updates neue Dateien, statt neue HTML-Bedienelemente mit alten Skripten oder Produktdaten zu kombinieren. Bei lokalen Änderungen denselben Vorbereitungsschritt ausführen.

## QR-Karte im Fußbereich

`assets/giggle-home-qr.png` und `.svg` enthalten die Zieladresse `https://giggle.stefanmarx.de/?source=qr`. Die SVG-Druckversion ist auf 32 mm mit vier Modulen weißem Rand angelegt; die PNG ist hochauflösend. Das Haus-Maskottchen begrüßt alle Besucher unabhängig von der Herkunft einmal pro Tab mit einem sieben Sekunden langen Hüpfen am unteren Bildschirmrand. Es fängt keine Klicks ab, verschwindet vollständig und bleibt bei reduzierter Bewegung aus. Der QR-Parameter kennzeichnet lediglich den Link und löst keine Sonderansicht aus. Keine Popups, Weiterleitung oder zusätzliche Analyse bzw. eigene Speicherung der Herkunft. Sprachwechsel erhalten den Parameter. Die ursprünglichen QR-Druckdateien ohne Parameter bleiben als frühere Chat-Downloads erhalten.

## Einheitliche Pfeile auf iOS

Sichtbare Navigations-, Produkt- und Downloadpfeile sind inline SVG mit currentColor statt Unicode-Emoji. Auch beim Sprachwechsel erzeugte Texte werden vor der Ausgabe umgewandelt. So behalten die Pfeile Form und Textfarbe auf dem iPhone. Der Pfeil im gezeichneten Marken-Schriftzug bleibt Teil des Bildes.

## Vollständige Markenbilder in den Kategoriekarten

Die Karte „Punk for Kids“ nutzt das bestätigte Social-Profilbild mit Gesicht und „giggle punk“-Schriftzug (`assets/giggle-punk-wordmark-square.png`). Die Karte „Kids“ zeigt das passende Haus mit zweizeiligem „Giggle Home“-Schriftzug (`assets/giggle-home-wordmark-square.png`). Das Hausmotiv wurde per integrierter Bildgenerierung mit Haus- und Profilbild als Referenzen erstellt: quadratisches Markenbild, bestehendes Haus oben, darunter Giggle in Creme und Home in Salbei mit braunen Konturen auf Elfenbein.

## Neues Shirt – 11.11.2026

„Another Mess in a Different Kitchen“ ergänzt Punk for Kids / Clothing und die redaktionelle Vorauswahl. Etsy-Artikel 4615170253 wurde als öffentlich bestätigt. Die Karte verwendet das unveränderte, vollständig sichtbare weiße Gelato-Produktmockup als lokale WebP-Datei (`assets/another-mess-kids-shirt.webp`), mit deutscher und englischer Kurzbeschreibung und direktem Etsy-Link. Ein Spreadshop-Link folgt erst nach dort bestätigter Veröffentlichung. Aktueller Umfang: 35 Produkte, davon 8 Shirts.
