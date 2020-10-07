DROP DATABASE IF EXISTS aufgabenmanager;

CREATE DATABASE IF NOT EXISTS aufgabenmanager;

USE aufgabenmanager;

CREATE TABLE IF NOT EXISTS benutzer (id int NOT NULL AUTO_INCREMENT, benutzerName char(30), email char(30), passwort char(30), constraint benutzerkey PRIMARY KEY (id));

INSERT INTO benutzer (benutzerName, email, passwort) VALUES ('Müller', 'test@gmail.com', 'test123');
INSERT INTO benutzer (benutzerName, email, passwort) VALUES ('Schmidt', 'test2@gmail.com', 'passwort123');

CREATE TABLE IF NOT EXISTS aufgaben (id int NOT NULL AUTO_INCREMENT, aufgabenName char(30), erstelldatum char(10), abgabedatum char(10), beschreibung char(60), stand int(1), benutzerID int(10), constraint aufgabekey PRIMARY KEY (id), constraint Benutzerzuordnung foreign key key1 (benutzerID) references benutzer (id) on delete set null);

INSERT INTO aufgaben (aufgabenName, erstelldatum, abgabedatum, beschreibung, stand, benutzerID) VALUES ('testaufgabe', '2020-01-04', '2020-01-08', 'eine Aufgabe zum Testen', 3, 2);

