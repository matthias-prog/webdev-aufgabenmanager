# Aufgabenmanager
*Fachliche Beschreibung der Web-Anwendung...*

Die Funktion der Webanwendung "Aufgabenmanager" ist, Aufgaben einer Arbeitsgemeinschaft zu organisieren.
Bei der einmaligen Registrierung wird ein Benutzer angelegt, mit Welchem man sich nun zukünftig anmelden kann.
War das Registrieren und die anschließende Anmeldung eines Benutzers erfolgreich ist nun der eigentliche Aufgabenmanager zu sehen.
In einer Tabelle werden in der Datenbank bereits bestehende Aufgaben angezeigt. Diese haben folgende Eigenschaften:

- Titel
- Beschreibung
- Status
- Bearbeitungszeit
- zuständiger Mitarbeiter

Neue Aufgaben können über den Button "ADD" hinzugefügt werden. Hierbei hat der Erschaffer nun die Möglichkeit den TItel, das Abgabedatum und die Aufgabenbeschreibung verändern. Bei anschließendem Klick auf "Hinzufügen" wird die Aufgabe in der Datenbank gespeichert und der Tabelle auf der Hauptseite hinzugefügt. Bei der Ansicht aller Aufgaben kann mit einem Drop-Down-Menü in der entsprechenden Tabellenspalte und -zeile der Status der Aufgabe ausgewählt werden. Dieser zeigt an, ob die Aufgabe "vorgeschlagen", "abgebrochen", "in Bearbeitung" oder "erledigt" ist. Diese Information wird bei Veränderung ebenfalls in die Datenbank übernommen. Neben dem Statusfeld ist zu jeder Aufgabe ein Balken vorhanden, der visuell die verbleibende Zeit, bis zur Abgabe der Aufgabe zeigt. Diese wird aus der Differenz des Abgabedatums und des aktuellen Datums errechnet.
In jeder Zeile sind außerdem zwei Buttons vorhanden. Mit dem Einen ist möglich, die ausgewählte Aufgabe zu löschen, mit dem Anderen, sie zu editieren. Beim Bearbeiten einer Aufgabe kann auch der zuständige Mitarbeiter ausgewählt werden.
Ein besonderes Feature ist die Suchleiste, mithilfe dieser kann nach bestimmten Aufgaben gesucht werden. Kriterien für die Suche sind Der Aufgabentitel und die Beschreibung.

Neben der Auflistung und Verwaltung der Aufgaben gibt es auch eine Benutzerverwaltung. Diese kann über den Punkt "Benutzer" in der Navigationsleiste erreicht werden. Hier werden alle Benutzer der Anwendung in einer Übersicht angezeigt. Benutzer haben folgende Eigenschaften:

- Benutzername
- E-Mail 
- Passwort

Ähnlich wie bei der Aufgabenübersicht können neue Benutzer angelegt, bearbeitet, oder gelöscht werden. Sämtliche Änderungen werden in der Datenbank verzeichnet.

Über den Button "Abmelden", in der rechten oberen Ecke, kann die aktuelle Session beendet werden und der Anwender gelangt zurück zur Login-Seite.

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

Die grafische Gestaltung des Frontends basiert ausschließlich aus Anpassungen mit Bootstrap.
Folgende Bootstrap Komponenten wurden für die Entwicklung der grafischen Oberfläche verwendet:

- Bootstrap Forms
- Bootstrap Floating Lables 
- Bootstrap Modals
- Bootstrap Buttons


