function Row(name, erstelldatum, abgabedatum, beschreibung, status, benutzerID) {
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
  this.giveTimeRemaining = function () {
    return Math.round(Math.abs((currentDate2.getTime() - abgabeDate.getTime()) / (oneDay)));
  }
  this.givePercentageElapsed = function () {
    const gesamteZeit = Math.round(Math.abs((abgabeDate.getTime() - erstellDate.getTime()) / (oneDay)));
    return Math.round((1 - (this.giveTimeRemaining() / gesamteZeit)) * 100);
  }
}

let benutzerSammlung = [];

fetch("/benutzer").then((res) => {
  if (!res.ok) return Promise.reject(res.status);

  return res.json();
}).then((benutzers) => {
  benutzers.forEach((benutzer) => {
    benutzerSammlung.push(benutzer);
  })
});

let zeilencounter = 0;
let tbody = document.getElementById('hook');
const insertRow = (row) => {
  const titlehtml = `<tr><td>${row.name}</td>`;
  const beschreibunghtml = `<td>${row.beschreibung}</td>`;

  let statushtml = `<td>
  <select class="form-control form-control-sm" name="status" id="status${zeilencounter}">`;

  switch (row.status) {
    case 0:
      statushtml += `<option selected value="To do">⬜ vorgeschlagen</option>
      <option value="Abgebrochen">🟥 abgebrochen</option>
      <option value="in Bearbeitung">🟨 in Arbeit</option>
      <option value="Fertig">🟩 erledigt</option>`;
      break;
    case 1:
      statushtml += `<option value="To do">⬜ vorgeschlagen</option>
      <option selected value="Abgebrochen">🟥 abgebrochen</option>
      <option value="in Bearbeitung">🟨 in Arbeit</option>
      <option value="Fertig">🟩 erledigt</option>`;
      break;
    case 2:
      statushtml += `<option value="To do">⬜ vorgeschlagen</option>
      <option value="Abgebrochen">🟥 abgebrochen</option>
      <option selected value="in Bearbeitung">🟨 in Arbeit</option>
      <option value="Fertig">🟩 erledigt</option>`;
      break;
    case 3:
      statushtml += `<option value="To do">⬜ vorgeschlagen</option>
      <option value="Abgebrochen">🟥 abgebrochen</option>
      <option value="in Bearbeitung">🟨 in Arbeit</option>
      <option selected value="Fertig">🟩 erledigt</option>`;
  }
  statushtml += ` </select></td>`;

  const timeremaininghtml = `<td>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: ${row.givePercentageElapsed()}%;" aria-valuenow="${row.givePercentageElapsed()}" aria-valuemin="0"aria-valuemax="100">${row.giveTimeRemaining()} Tage</div>
                                </div>
                            </td>`;

  let benutzerhtml = `<select class="form-control form-control-sm" name="mitarbeiter" id="MA${zeilencounter}">`;

  benutzerSammlung.forEach(element => {
    if (element.id === row.benutzerID) {
      benutzerhtml = benutzerhtml + `<option selected value="${element.benutzerName}">${element.benutzerName}</option>`
    } else {
      benutzerhtml = benutzerhtml + `<option value="${element.benutzerName}">${element.benutzerName}</option>`
    }

  });
  benutzerhtml = benutzerhtml + `</select>`;

  const modaledit = `<td>
    <button type="button" class="btn btn-warning" data-toggle="modal"
      data-target="#ModalEditAufgabe${zeilencounter}">📝</button>

    <div class="modal fade" id="ModalEditAufgabe${zeilencounter}" tabindex="-1" role="dialog"
      aria-labelledby="ModalEditAufgabeTitle${zeilencounter}" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="form">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ModalEditAufgabeLongTitle${zeilencounter}" style="color:black">Aufgabe bearbeiten</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <label for="fname${zeilencounter}" style="color:black">Aufgabenname:</label>
              <input type="text" id="fname${zeilencounter}" name="fname" value="${row.name}" class="form-control">
            </div>
            <div class="form-group">
              <label for="lname" style="color:black">Abgabedatum:</label>
              <br>
              <input type="date" id="day" name="day" value="${row.abgabedatum}" min="2017-01-01" max="2022-01-01">
            </div>
            <div class="form-group">
              <label for="beschr" style="color:black">Beschreibung:</label>
              <textarea id="beschr" name="beschr" class="form-control">${row.beschreibung}</textarea>
            </div>
            <div class="form-group">
              <label for="beschr" style="color:black">Mitarbeiter:</label>
                ${benutzerhtml}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
            <button type="submit" class="btn btn-primary" data-dismiss="modal">Änderungen speichern</button>
          </div>
          </form>
        </div>
      </div>
    </div>

    </td>`;

  const modaldelete = `
    <td>
      <button type="button" class="btn btn-danger" data-toggle="modal"
        data-target="#ModalDeleteAufgabe${zeilencounter}">🗑</button>

      <div class="modal fade" id="ModalDeleteAufgabe${zeilencounter}" tabindex="-1" aria-labelledby="ModalDeleteAufgabeTitel"
        aria-hidden="true">
        <div class="modal-dialog ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="ModalDeleteAufgabeTitel${zeilencounter}" style="color:black">Wirklich löschen?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal">Löschen</button>
            </div>
          </div>
        </div>
      </div>
    </td>`;

  tbody.insertAdjacentHTML('beforeend', titlehtml + beschreibunghtml + statushtml + timeremaininghtml + modaledit + modaldelete);
  zeilencounter++;
}




fetch("/aufgaben").then((res) => {
  if (!res.ok) return Promise.reject(res.status);

  return res.json();
}).then((aufgaben) => {
  aufgaben.forEach((aufgabe) => {
    let aufgabeROW = new Row(aufgabe.aufgabenName, aufgabe.erstelldatum, aufgabe.abgabedatum, aufgabe.beschreibung, aufgabe.stand, aufgabe.benutzerID);
    insertRow(aufgabeROW);
  })
});
