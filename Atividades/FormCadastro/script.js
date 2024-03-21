loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let nome = document.getElementById("nome");
    let email = document.getElementById("email");

    if (nome.value == "") {
        // throw error
        alert("Preencha todos os campos");
    } else {
        alert("Formulário enviado com sucesso");
        alert("Nome: " + nome.value + "\nEmail: " + email.value);
        // perform operation with form input
        let data = {
            nome: nome.value,
            email: email.value,
        };
        console.log(data);
        show_image(
            "https://cdn.dribbble.com/users/147386/screenshots/5315437/success-tick-dribbble.gif"
        );
        setTimeout(() => {
            document.getElementsByTagName("img")[0].remove();
        }, 5000);
    }
});

function show_image(scr, alt = "logo") {
    var img = document.getElementsByTagName("img");
    img.src = scr;
    img.alt = alt;

    document.body.appendChild(img);
}
