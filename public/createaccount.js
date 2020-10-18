const form = document.querySelector(".form-signin");

form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const username = $('#inputUsername').val();
    const email = $('#inputEmail').val();
    const password = $('#inputPassword').val();
    const verifypassword = $('#verifyInputPassword').val();

   const values = {
        benutzerName: username,
        email: email,
        passwort: password
   };
   if(password === verifypassword){
    fetch("/benutzer", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            "content-type": "application/json",
        },
    }).then((res) => {
        if (res.ok) {
            location.href = '/index.html';
        } else {
            alert("Registrierung fehlgeschlagen");
        }
    });
} else{
    alert("Passwörter stimmen nicht überein!");
}

});