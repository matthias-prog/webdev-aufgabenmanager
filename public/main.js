//Konstruktor zum Erstellen eines row-Objekts
function Row(id, name, erstelldatum, abgabedatum, beschreibung, status, benutzerID) {
  this.id = id;
  this.name = name;
  this.erstelldatum = erstelldatum;
  this.abgabedatum = abgabedatum;
  this.beschreibung = beschreibung;
  this.status = status;
  this.benutzerID = benutzerID;
  let currentDate = new Date().toISOString().slice(0, 10);
  let currentDateParts = currentDate.split("-");
  let erstellDateParts = erstelldatum.split("-");
  let abgabeDateParts = abgabedatum.split("-");
  let oneDay = 24 * 60 * 60 * 1000;
  let currentDate2 = new Date(+currentDateParts[0], currentDateParts[1] - 1, currentDateParts[2]);
  let abgabeDate = new Date(+abgabeDateParts[0], abgabeDateParts[1] - 1, abgabeDateParts[2]);
  let erstellDate = new Date(+erstellDateParts[0], erstellDateParts[1] - 1, erstellDateParts[2]);

  //gibt die noch verbleibende  Zeit bis zum Abgabedatum in Tagen zurück
  this.giveTimeRemaining = function () {
    return Math.round(Math.abs((currentDate2.getTime() - abgabeDate.getTime()) / (oneDay)));
  }

  //Funktion die die bereits vergangene Zeit seit Erstellen der Augabe in Prozent ausgibt  --> nötig für die Progressbar
  this.givePercentageElapsed = function () {
    const gesamteZeit = Math.round(Math.abs((abgabeDate.getTime() - erstellDate.getTime()) / (oneDay)));
    return Math.round((1 - (this.giveTimeRemaining() / gesamteZeit)) * 100);
  }
}

//Benutzer werden vor den Aufgaben geladen, da diese Daten zum Einfügen der Tabellenzeilen nötig sind
let benutzerSammlung = [];

fetch("/benutzer").then((res) => {
  if (!res.ok) return Promise.reject(res.status);

  return res.json();
}).then((benutzers) => {
  benutzers.forEach((benutzer) => {
    benutzerSammlung.push(benutzer);
  })
});

//Tabellen-Body wird ausgewählt
let tbody = document.getElementById('hook');

//Funktion zum Einfügen einer Tabellenzeile
const insertRow = (row) => {
  const titlehtml = `<tr id="row${row.id}"><td>${row.name}</td>`;
  const beschreibunghtml = `<td>${row.beschreibung}</td>`;

  //HTML-Code für das Status-Select
  let statushtml = `<td>
  <select class="form-control form-control-sm" name="status" id="status${row.id}">`;

  //Status aus Datenbank wird ausgelesen und Select-Element entsprechend ausgewählt
  switch (row.status) {
    case 0: //vorgeschlagen bzw. neu erstellt
      statushtml += `<option selected value="0">⬜ vorgeschlagen</option>
      <option value="1">🟥 abgebrochen</option>
      <option value="2">🟨 in Arbeit</option>
      <option value="3">🟩 erledigt</option>`;
      break;
    case 1: //abgebrochen
      statushtml += `<option value="0">⬜ vorgeschlagen</option>
      <option selected value="1">🟥 abgebrochen</option>
      <option value="2">🟨 in Arbeit</option>
      <option value="3">🟩 erledigt</option>`;
      break;
    case 2: //in Arbeit
      statushtml += `<option value="0">⬜ vorgeschlagen</option>
      <option value="1">🟥 abgebrochen</option>
      <option selected value="2">🟨 in Arbeit</option>
      <option value="3">🟩 erledigt</option>`;
      break;
    case 3: //erledigt
      statushtml += `<option value="0">⬜ vorgeschlagen</option>
      <option value="1">🟥 abgebrochen</option>
      <option value="2">🟨 in Arbeit</option>
      <option selected value="3">🟩 erledigt</option>`;
  }
  statushtml += ` </select></td>`;

  //HTML-Code für die Progressbar
  const timeremaininghtml = `<td>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="min-width: 15%; width: ${row.givePercentageElapsed()}%;" aria-valuenow="${row.givePercentageElapsed()}" aria-valuemin="0"aria-valuemax="100">${row.giveTimeRemaining()} Tage</div>
                                </div>
                            </td>`;

  //bereits geladene Nutzer werden einen Select-Element hinzugefügt
  let benutzerhtml = `<select class="form-control form-control-sm" name="mitarbeiter" id="MA${row.id}">`;

  benutzerSammlung.forEach(element => {
    if (element.id === row.benutzerID) {
      benutzerhtml = benutzerhtml + `<option selected value="${element.id}">${element.benutzerName}</option>`
    } else {
      benutzerhtml = benutzerhtml + `<option value="${element.id}">${element.benutzerName}</option>`
    }

  });
  benutzerhtml = benutzerhtml + `</select>`;

  //HTML-Code für das Edit-Modal
  const modaledit = `<td>
    <button type="button" class="btn btn-warning" data-toggle="modal"
      data-target="#ModalEditAufgabe${row.id}">📝</button>

    <div class="modal fade" id="ModalEditAufgabe${row.id}" tabindex="-1" role="dialog"
      aria-labelledby="ModalEditAufgabeTitle${row.id}" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="form">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ModalEditAufgabeLongTitle${row.id}" style="color:black">Aufgabe bearbeiten</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <label for="fname${row.id}" style="color:black">Aufgabenname:</label>
              <input type="text" id="fname${row.id}" name="fname" value="${row.name}" class="form-control">
            </div>
            <div class="form-group">
              <label for="lname" style="color:black">Abgabedatum:</label>
              <br>
              <input type="date" id="abgabedatum${row.id}" name="day" value="${row.abgabedatum}" min="2017-01-01" max="2022-01-01">
            </div>
            <div class="form-group">
              <label for="beschr" style="color:black">Beschreibung:</label>
              <textarea id="beschr${row.id}" name="beschr" class="form-control">${row.beschreibung}</textarea>
            </div>
            <div class="form-group">
              <label for="beschr" style="color:black">Mitarbeiter:</label>
                ${benutzerhtml}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
            <button type="submit" class="btn btn-primary">Änderungen speichern</button>
          </div>
          </form>
        </div>
      </div>
    </div>

    </td>`;

  //HTML-Code für das Löschen-Modal
  const modaldelete = `
    <td>
      <button type="button" class="btn btn-danger" data-toggle="modal"
        data-target="#ModalDeleteAufgabe${row.id}">🗑</button>

      <div class="modal fade" id="ModalDeleteAufgabe${row.id}" tabindex="-1" aria-labelledby="ModalDeleteAufgabeTitel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="ModalDeleteAufgabeTitel${row.id}" style="color:black">Wirklich löschen?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
              <button type="button" class="btn btn-primary">Löschen</button>
            </div>
          </div>
        </div>
      </div>
    </td>`;

  //Zusammengebauter HTML-Code für die Zeile wird am Ende der Tabelle eingefügt
  tbody.insertAdjacentHTML('beforeend', titlehtml + beschreibunghtml + statushtml + timeremaininghtml + modaledit + modaldelete);

  //actionListener auf das Abschicken des Löschen-Modals
  $(`#ModalDeleteAufgabe${row.id}`).on('click', '.btn-primary', function () {
    fetch(`/aufgaben/${row.id}`, {
      method: "DELETE"
    }).then((res) => {
      if (res.ok) {
        const rowToDelete = document.querySelector(`#row${row.id}`);
        rowToDelete.remove();
      } else {
        alert("Löschen fehlgeschlagen!");
      }
    });

    $(`#ModalDeleteAufgabe${row.id}`).modal('hide');
  });

  //actionListener auf das Abschicken des Edit-Modals
  $(`#ModalEditAufgabe${row.id}`).on('click', '.btn-primary', function () {
    const aufgabenname = $(`#fname${row.id}`).val();
    const abgabedatum = $(`#abgabedatum${row.id}`).val();
    const beschreibung = $(`#beschr${row.id}`).val();
    const mitarbeiter = $(`#MA${row.id} :selected`).val();

    const values = {
      id: row.id,
      aufgabenName: aufgabenname,
      abgabedatum: abgabedatum,
      beschreibung: beschreibung,
      benutzerID: mitarbeiter
    };

    fetch("/aufgaben", {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      console.log(res.ok);
      ladeAufgaben(); //tabelle wird neu geladen um aktualisierte Aufgabe gleich anzuzeigen
    }).catch((e) => { alert(e) });

    $(`#ModalEditAufgabe${row.id}`).modal('hide');
  });

  //actionListener auf das Ändern des status-Selects
  $(`#status${row.id}`).on('change', function () {
    const status = $(`#status${row.id} :selected`).val();
    fetch(`aufgaben/${row.id}/${status}`, {
      method: "PATCH"
    }).then((res) => {
      if (!res.ok) {
        ladeAufgaben(); //alter Stand wird im Fehlerfall von der DB geladen --> verhindert falsche Ansicht
        return Promise.reject(res.status);
      }

    }).catch((e) => {
      alert(`Fehler ${e}`);
    });
  });

}//ende von insertRow()

//Funktion zum Neuladen der Aufgaben von der Datenbank
const ladeAufgaben = () => {
  fetch("/aufgaben").then((res) => {
    if (!res.ok) return Promise.reject(res.status);

    return res.json();
  }).then((aufgaben) => {
    tbody.innerHTML = ''; //tabelle wird geleert
    aufgaben.forEach((aufgabe) => {
      let aufgabeROW = new Row(aufgabe.id, aufgabe.aufgabenName, aufgabe.erstelldatum, aufgabe.abgabedatum, aufgabe.beschreibung, aufgabe.stand, aufgabe.benutzerID);
      insertRow(aufgabeROW);
    })
  }).catch((e) => {
    alert(`Fehler ${e}`);
  });
}

//ActionListener auf das Abschicken des Add-Modals
$('#ModalAddAufgabe').on('click', '.btn-primary', function () {
  const aufgabenname = $('#fnameAdd').val();
  const abgabedatum = $('#dayAdd').val();
  const beschreibung = $('#beschrAdd').val();

  const values = {
    aufgabenName: aufgabenname,
    erstelldatum: new Date().toISOString().slice(0, 10),
    abgabedatum: abgabedatum,
    beschreibung: beschreibung,
    stand: 0,
    benutzerID: 1
  };

  fetch("/aufgaben", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => {
    console.log(res.ok);
    ladeAufgaben(); //tabelle wird neu geladen um neue Aufgabe gleich anzuzeigen
  }).catch((e) => { alert(e) });;

  $('#ModalAddAufgabe').modal('hide');
});

ladeAufgaben();

//Quelle: https://www.w3schools.com/bootstrap4/tryit.asp?filename=trybs_filters_table&stacked=h
$(document).ready(function () {
  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#hook tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});