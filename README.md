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

Neue Aufgaben können über den Button "ADD" hinzugefügt werden. Hierbei hat der Erschaffer die Möglichkeit den Titel, das Abgabedatum und die Aufgabenbeschreibung verändern. Bei anschließendem Klick auf "Hinzufügen" wird die Aufgabe in der Datenbank gespeichert und der Tabelle auf der Hauptseite hinzugefügt. Bei der Ansicht aller Aufgaben kann mit einem Drop-Down-Menü in der entsprechenden Tabellenspalte und -zeile der Status der Aufgabe ausgewählt werden. Dieser zeigt an, ob die Aufgabe "vorgeschlagen", "abgebrochen", "in Bearbeitung" oder "erledigt" ist. Diese Information wird bei Veränderung ebenfalls in die Datenbank übernommen. Neben dem Statusfeld ist zu jeder Aufgabe ein Balken vorhanden, der visuell die verbleibende Zeit bis zur Abgabe der Aufgabe zeigt. Diese wird aus der Differenz des Abgabedatums und des aktuellen Datums errechnet.
In jeder Zeile sind außerdem zwei Buttons vorhanden. Mit dem Einen ist möglich, die ausgewählte Aufgabe zu löschen, mit dem Anderen, sie zu editieren. Beim Bearbeiten einer Aufgabe kann auch der zuständige Mitarbeiter ausgewählt werden.
Ein besonderes Feature ist die Suchleiste, mithilfe dieser kann nach bestimmten Aufgaben gesucht werden. Kriterien für die Suche sind der Aufgabentitel und die Beschreibung.

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

Den Anforderungen gemäß teilt sich die Anwendung in Frontend, Backend und Datenbank auf. 

Das Frontend beinhaltet die grafische Oberfläche und die Verknüpfung zum Backend. Programmiersprachen des Frontends sind HTML und CSS. Nativer CSS-Code ist aber nicht vorhanden. Für das CSS-Styling des Frontends wurde das Bootstrap-Framework in der Version 4.5.3 verwendet. Mithilfe von JQuery werden Werte aus Formularfeldern abgefragt. Diese Technologie wurde ausgewählt, da mit ihr alle Features von Bootstrap optimal genutzt werden können. Im Frontend angeforderte Daten werden über die Fetch-API beim Backend angefragt.

Das Backend beinhaltet die Logik der Anwendung und ist Bindeglied zwischen Frontend und Datenbank. Anfragen oder Eingaben aus dem Frontend werden im Backend verarbeitet. Anschließend werden die Daten aus der Datenbank abgefragt oder aktualisiert. Der Transport von Daten zu und von der Datenbank erfolgt mithilfe von JSON-Datensätze.

Die Datenbank verwendet die MySQL-Technologie. In ihr sind die Datensätze für die Anwendung gespeichert. Aufgebaut ist die Datenbank aus zwei Tabellen. Je eine Tabelle pro Anwendungsfunktion (Aufgabenmanager & Benutzerverwaltung).

### Datenmodell

Um unsere Daten zwischen Client und Server auszutauschen, haben wir uns für das JSON-Format entschieden.

Sobald unsere Express-Anwendung mit der Route /aufgaben eine HTTP-Anfrage in Form einer GET-Methode bekommt,
sendet sie folgende Antwort im JSON-Format zurück:

``
[
  {"id": 1,
   "aufgabenName": "Erstellung einer Präsentation",
   "erstelldatum": "31.10.2020",
   "abgabedatum": "07.11.2020",
   "beschreibung": "Erstellen aller Präsentationsfolien mit Hilfe von PowerPoint",
   "stand": 2,
   "benutzerID": 1}
]
``

Anmerkung: Der Stand kann die Werte 0, 1, 2 oder 3 annehmen, welche jeweils den Status der Aufgabe beschreiben
(vorgeschlagen, abgebrochen, in Arbeit, erledigt).

Bekommt die Route /benutzer eine Anfrage, wird folgende Antwort zurückgesendet:

``
[
  {"id": 1,
   "benutzerName": "Max Müller",
   "email": "mail@example.com",
   "passwort": "supersecret"}
]
``

Wenn der Client eine Anfrage an die Route /aufgaben in Form einer POST-Methode sendet, wird diese folgendermaßen beantwortet:

``
 [
   {"id": 2,
    "aufgabenName": "Fertigstellung des Projekts",
    "erstelldatum": "25.09.2020",
    "abgabedatum": "30.10.2020",
    "beschreibung": "Erledigen aller noch ausstehenden Aufgaben",
    "stand": 2,
    "benutzerID": 2}
 ]
 ``

 Sendet er eine Anfrage an /benutzer, gibt der Server diese JSON-Antwort zurück:

 ``
   [
    {"id": 2,
     "benutzerName": "Max Mustermann",
     "email": "example@mail.com",
     "passwort": "mypassword"}
   ]
``

### REST Services (Backend)
*Beschreibung aller REST Services*

In der Anwendung gibt es eine grobe Einteilung in REST-Routen, die etwas mit Aufgaben oder mit Benutzern zu tun haben. Alle Routen für Aufgaben fangen mit `/aufgaben` und alle für Benutzer mit `/benutzer` an.

REST Routen Aufgaben:

- GET Route auf "/aufgaben" =>
Führt ein SELECT SQL-Statement aus, um die Datensätze der Tabelle „Aufgaben“ zu holen.

- POST Route auf "/aufgaben" =>
Führt ein INSERT INTO SQL-Statement zum Einfügen neuer Aufgaben in die Tabelle „Aufgaben“ aus.

- PUT Route auf "/aufgaben" =>
Führt ein SELECT SQL-Statement aus, um den gewünschten Datensatz der Tabelle „Aufgaben“ zu laden. Anschließend werden je nach Anzahl der Änderungen bis zu vier UPDATE Statements ausgeführt, um die Datensätze gemäß den Änderungen anzupassen.

- DELETE Route auf "/aufgaben/:id" =>
Führt ein DELETE SQL-Statement aus, um einen gewünschten Datensatz der Tabelle „Aufgaben“ zu entfernen.

- PATCH Route auf "/aufgaben/:id/:status" =>
Führt ein UPDATE SQL-Statement aus, um den Stand (vorgeschlagen, abgebrochen, in Arbeit oder erledigt) einer Aufgabe zu aktualisieren.

REST Routen Benutzer:

- GET Route auf "/benutzer" =>
Führt ein SELECT SQL-Statement aus, um die Datensätze der Tabelle „Benutzer“ zu holen.

- POST Route auf "/benutzer/login" =>
Führt ein SELECT SQL-Statement aus, um zu überprüfen ob eine eingegebene E-Mail-Adresse und ein eigegebenes Passwort mit einem Eintrag in der Tabelle „Benutzer“ übereinstimmt.

- POST Route auf "/benutzer" =>
Führt ein INSERT INTO SQL-Statement zum Einfügen neuer Benutzer in die Tabelle „Benutzer“ aus.

- DELETE Route auf "/benutzer/:id" =>
Führt ein DELETE SQL-Statement aus, um einen gewünschten Datensatz der Tabelle „Benutzer“ zu entfernen.

- PUT Route auf "/benutzer" =>
Führt ein SELECT SQL-Statement aus, um den gewünschten Datensatz der Tabelle „Benutzer“ zu laden. Anschließend werden je nach Anzahl der Änderungen bis zu drei UPDATE Statements ausgeführt, um die Datensätze gemäß den Änderungen anzupassen.


### Frontend
*Beschreibung aller UI Masken, Events, fetch Requests...*

Die grafische Gestaltung (das CSS-Styling) des Frontends basiert ausschließlich aus Anpassungen mit dem Bootstrap-Framework. Grund hierfür ist die hohe Benutzerfreundlichkeit und intuitive Bedienbarkeit. Des Weiteren erleichtert die Verwendung dieses Frameworks die Anwendungsentwicklung, da dank bereits bestehenden  Außerdem wird so ein einheitliches Layout und Design ermöglicht und unterstützt. Das Layout der Web-Anwendung ist sehr schlicht gehalten, sodass die Aufmerksamkeit der Nutzer auf den Inhalt gerichtet wird.

Folgende Bootstrap Komponenten wurden für die Entwicklung der grafischen Oberfläche verwendet:

- Bootstrap Buttons
- Bootstrap Container
- Bootstrap Floating Lables 
- Bootstrap Forms
- Bootstrap Modals
- Bootstrap Navbar
- ...

Werte aus den Bootstrap-Forms werden mithilfe von JQuery abgefragt.

Hinter Buttons verbergen sich weitere Funktionen. Die Buttons sind mit ActionListenern versehen, die auf Klicken reagieren und anschließend die gewollte Aktion ausführen. Das kann beispielsweise das Hinzufügen oder Löschen einer Aufgabe sein.
Bei dem Attribut "Status" der einzelnen Aufgaben ist ebenfalls ein ActionListener hinterlegt. Dieser reagiert auf Veränderungen. In diesem Fall wäre das eine Statusänderung. Wird eine solche registriert, wird die Veränderung weiter verarbeitet. 
Bei der Registrierung eines neuen Nutzers reagiert ein EventListener auf ein "Submit"-Signal, welches durch Klicken auf einen Button gesendet wird.

