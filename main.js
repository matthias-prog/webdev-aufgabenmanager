let tbody = document.getElementById('hook');
let zeilencounter = 3;


const insertRows = (title, datum, datepicker, beschreibung, timeremaining, mitarbeiter) => {
    const titlehtml = `<tr><td>${title}</td>`;
    const datumhtml = `<td>${datum}</td>`;
    const datepickerhtml = `<td>
                                <form action="/action_page.php">
                                    <input type="date" name="day" value="${datepicker}" min="2017-01-01" max="2022-01-01">
                                </form>
                            </td>`;
    const beschreibunghtml = `<td>${beschreibung}</td>`;
    const statushtml = `<td>
                            <select class="form-control form-control-sm" name="status" id="status2">
                                <option value="To do">⬜ vorgeschlagen</option>
                                <option value="Abgebrochen">🟥 abgebrochen</option>
                                <option value="in Bearbeitung">🟨 in Arbeit</option>
                                <option value="Fertig">🟩 erledigt</option>
                            </select>
                        </td>`;
    const timeremaininghtml = `<td>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 83%;" aria-valuenow="84" aria-valuemin="0"aria-valuemax="100">${timeremaining}Tage</div>
                                </div>
                            </td>`;

    let mitarbeiterhtml = `<td><select class="form-control form-control-sm" name="mitarbeiter" id="MA2">`;
    mitarbeiter.forEach(element => {
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
            <h5 class="modal-title" id="ModalEditAufgabeLongTitle${zeilencounter}">Aufgabe bearbeiten</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <label for="fname">Aufgabenname:</label>
              <input type="text" id="fname" name="fname" value="${title}" class="form-control">
            </div>
            <div class="form-group">
              <label for="lname">Datum:</label>
              <br>
              <input type="date" id="day" name="day" value="${datepicker}" min="2017-01-01" max="2022-01-01">
            </div>
            <div class="form-group">
              <label for="beschr">Beschreibung:</label>
              <textarea id="beschr" name="beschr" class="form-control">${beschreibung}</textarea>
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

    const modaldelete = `
    <td>
      <button type="button" class="btn btn-danger" data-toggle="modal"
        data-target="#ModalDeleteAufgabe${zeilencounter}">🗑</button>

      <div class="modal fade" id="ModalDeleteAufgabe${zeilencounter}" tabindex="-1" aria-labelledby="ModalDeleteAufgabeTitel"
        aria-hidden="true">
        <div class="modal-dialog ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="ModalDeleteAufgabeTitel${zeilencounter}">Wirklich löschen?</h5>
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

const ma = ['Müller', 'Gerd'];
for (let i = 0; i < 200; i++) {
    insertRows('testjs', '01.21.2123', '2019-02-02', 'dies ist ein test von js', 5, ma);
}
