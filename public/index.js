const form = document.querySelector(".form-signin");

form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const email = $('#inputEmail').val();
    const passwort = $('#inputPassword').val();

    const values = {
        email: email,
        passwort: passwort

    };

    fetch("/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            "content-type": "application/json",
        },
    }).then((res) => {
        if (res.ok) {
            console.log(res);
            location.href = '/main.html';
        } else {
            alert("Login fehlgeschlagen");
        }
    });
}); 
