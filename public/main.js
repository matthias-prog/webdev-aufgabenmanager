let tbody = document.getElementById('hook');
let zeilencounter = 3;

function Row(name, erstelldatum, abgabedatum, beschreibung, status, mitarbeiter) {
  this.name = name;
  this.erstelldatum = new Date().toISOString().slice(0, 10);
  this.abgabedatum = abgabedatum;
  this.beschreibung = beschreibung;
  this.status = status;
  this.mitarbeiter = mitarbeiter;
  var firstDateParts = erstelldatum.split("-");
  var secondDateParts = abgabedatum.split("-");
  var oneDay = 24 * 60 * 60 * 1000;
  var firstDate = new Date(+firstDateParts[0], firstDateParts[1] - 1, firstDateParts[2]);
  var secondDate = new Date(+secondDateParts[0], secondDateParts[1] - 1, secondDateParts[2]);
  this.giveTimeRemaining = function () {
    //funktioniert noch nicht
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
  }
}
let row1 = new Row('classtest', '2020-01-22', '2020-02-25', 'ein test von klassen', 3, ['Gerd', 'Hans', 'Peter']);

const insertRow = (row) => {
  const titlehtml = `<tr><td>${row.name}</td>`;
  const datumhtml = `<td>${row.erstelldatum}</td>`;
  const datepickerhtml = `<td>
                                <form action="/action_page.php">
                                    <input type="date" name="day" value="${row.abgabedatum}" min="2017-01-01" max="2022-01-01">
                                </form>
                            </td>`;
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
                                    <div class="progress-bar" role="progressbar" style="width: 83%;" aria-valuenow="84" aria-valuemin="0"aria-valuemax="100">${row.giveTimeRemaining()} Tage</div>
                                </div>
                            </td>`;

  let mitarbeiterhtml = `<td><select class="form-control form-control-sm" name="mitarbeiter" id="MA${zeilencounter}">`;

  row.mitarbeiter.forEach(element => {
    mitarbeiterhtml = mitarbeiterhtml + `<option value="${element}">${element}</option>`
  });
  mitarbeiterhtml = mitarbeiterhtml + `</select></td>`;

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
              <label for="fname" style="color:black">Aufgabenname:</label>
              <input type="text" id="fname" name="fname" value="${row.name}" class="form-control">
            </div>
            <div class="form-group">
              <label for="lname" style="color:black">Datum:</label>
              <br>
              <input type="date" id="day" name="day" value="${row.abgabedatum}" min="2017-01-01" max="2022-01-01">
            </div>
            <div class="form-group">
              <label for="beschr" style="color:black">Beschreibung:</label>
              <textarea id="beschr" name="beschr" class="form-control">${row.beschreibung}</textarea>
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

  tbody.insertAdjacentHTML('beforeend', titlehtml + datumhtml + datepickerhtml + beschreibunghtml + statushtml + timeremaininghtml + mitarbeiterhtml + modaledit + modaldelete);
  zeilencounter++;
}
insertRow(row1);

fetch("/aufgaben").then((res) => {
  console.log(res.ok);
});

