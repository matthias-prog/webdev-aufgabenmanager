# Aufgabenmanager
*Fachliche Beschreibung der Web-Anwendung...*

Im Aufgabemanager können Aufgaben mit Titel, Beschreibung und Abgabedatum angelegt werden. Danach kann der Status der Aufgabe verändert werden, entweder auf "vorgeschlagen", "abgebrochen", "in Bearbeitung" oder "erledigt". Auch kann ein Nutzer über seinen Nutzernamen einer Aufgabe zugeteilt werden. Weiter können auch alle Eigenschaften der Aufgabe wieder verändert werden (bis auf das Erstelldatum). Diese erstellten Aufgabe werden in der Datenbank gespeichert und werden auf einer Übersichtsseite angezeigt. Dort befindet sich auch für jede Aufgabe ein Ladebalken, der die noch zur Verfügung stehende Zeit bis zur Abgabe visualisiert. Natürlich können die Aufgaben auch gelöscht werden.

Neben den Aufgabe gibt es auch eine Benutzerverwaltung. Dort werden alle Nutzer in einer Übersicht angezeigt, wo sie verändert, gelöscht oder auch neu erstellt werden können. Diese Nutzer können dann einer Aufgabe über ihren Benutzernamen zugeteilt werden. Auch können die Benutzer benutzt werden, um sich auf der Seite anzumelden. Auf der entsprechenden Login-Seite gibt es auch die Möglichkeit sich zu registrieren, also einen neuen Nutzer zu erstellen.

## QuickStart
1. `git clone https://github.com/matthias-prog/webdev-aufgabenmanager.git`
2. `npm install`
3. database.sql in MySQL importieren
4. MySQL starten mit Nutzer "root" und Passwort ""
5. `node server.js`
6. http://localhost:55 im Browser aufrufen

## Architektur
*Beschreibung der eingesetzten Technologien und Architektur. Ggf. Schaubild. Zusammenspiel Frontend <-> Backend*

### Datenmodell
*Beispiel JSON für alle verwendetetn Datenmodelle*

``
[
  { "id": 1, "title": "TODO STUFF" },
  { "id": 2, "title": "TODO MORE STUFF" }
]
``

### REST Services (Backend)
*Beschreibung aller REST Services*

### Frontend
*Beschreibung aller UI Masken, Events, fetch Requests...*
