function RowUser(id, name, email, passwort) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwort = passwort;
}

let tbody = document.getElementById('hook');
const insertRow = (rowuser) => {
  const namehtml = `<tr id="row${rowuser.id}"><td>${rowuser.name}</td>`;
  const emailhtml = `<td>${rowuser.email}</td>`;
  const passworthtml = `<td>${rowuser.passwort}</td>`;

  const modaledit = `<td>
  <button type="button" class="btn btn-warning" data-toggle="modal"
    data-target="#modalEditUser${rowuser.id}">📝</button>

    <div class="modal fade" id="modalEditUser${rowuser.id}" tabindex="-1" role="dialog" aria-labelledby="modalEditUserTitle${rowuser.id}"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="form">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle${rowuser.id}" style="color:black">Eintrag bearbeiten</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <!-- Body Modal "Bearbeiten" -->
        <div class="modal-body">
          <form action="benutzer.html">
            <div class="form-group">
              <label for="fname${rowuser.id}" style="color:black">Benutzername:</label>
              <input type="text" id="fname${rowuser.id}" name="fname" value="${rowuser.name}" class="form-control">
            </div>
            <div class="form-group">
              <label for="lname" style="color:black">E-Mail:</label>
              <input type="text" id="lname${rowuser.id}" name="lname" value="${rowuser.email}" class="form-control">
            </div>
            <div class="form-group">
              <label for="pname" style="color:black">Passwort:</label>
              <input type="text" id="pname${rowuser.id}" name="pname" value="${rowuser.passwort}" class="form-control">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
              <button type="button" class="btn btn-warning">Änderungen speichern</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    </td>`;

  const modaldelete = `
    <td>
    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#ModalDeleteBenutzer${rowuser.id}">🗑</button>

        <div class="modal fade" id="ModalDeleteBenutzer${rowuser.id}" tabindex="-1" aria-labelledby="ModalDeleteBenutzerTitel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="ModalDeleteBenutzerTitel${rowuser.id}" style="color:black">Wirklich löschen?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
              <button type="button" class="btn btn-primary" >Löschen</button>
            </div>
          </div>
        </div>
      </div>
    </td>`;

  tbody.insertAdjacentHTML('beforeend', namehtml + emailhtml + passworthtml + modaledit + modaldelete);

  $(`#ModalDeleteBenutzer${rowuser.id}`).on('click', '.btn-primary', function () {
    fetch(`/benutzer/${rowuser.id}`, {
      method: "DELETE"
    }).then((res) => {
      if (res.ok) {
        const rowToDelete = document.querySelector(`#row${rowuser.id}`);
        rowToDelete.remove();
      } else {
        alert("Löschen fehlgeschlagen!");
      }
    });

    $(`#ModalDeleteBenuzter${rowuser.id}`).modal('hide');
  });

  $(`#modalEditUser${rowuser.id}`).on('click', '.btn-warning', function () {
    const benutzername = $(`#fname${rowuser.id}`).val();
    const email = $(`#lname${rowuser.id}`).val();
    const passwort = $(`#pname${rowuser.id}`).val();

    const values = {
      id: rowuser.id,
      benutzerName: benutzername,
      email: email,
      passwort: passwort,
    };

    fetch("/benutzer", {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      console.log(res.ok);
      ladeBenutzer(); //tabelle wird neu geladen um aktualisierte Benutzer gleich anzuzeigen
    }).catch((e) => { alert(e) });

    $(`#modalEditUser${rowuser.id}`).modal('hide');
  });

}//ende von insertRow()

const ladeBenutzer = () => {
  fetch("/benutzer").then((res) => {
    if (!res.ok) return Promise.reject(res.status);

    return res.json();
  }).then((benutzer) => {
    tbody.innerHTML = ''; //tabelle wird geleert
    benutzer.forEach((user) => {
      let userROW = new RowUser(user.id, user.benutzerName ,user.email, user.passwort);
      insertRow(userROW);
    })
  }).catch((e) => {
    alert(`Fehler ${e}`);
  });
}

$('#modalAddUser').on('click', '.btn-warning', function () {
  const benutzername = $('#fname').val();
  const email = $('#lname').val();
  const passwort = $('#pname').val();

  const values = {
    benutzerName: benutzername,
    email: email,
    passwort: passwort,

  };

  fetch("/benutzer", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => {
    console.log(res.ok);
    ladeBenutzer(); //tabelle wird neu geladen um neue Benutzer gleich anzuzeigen
  }).catch((e) => { alert(e) });

  $('#modalAddUser').modal('hide');
});

ladeBenutzer();