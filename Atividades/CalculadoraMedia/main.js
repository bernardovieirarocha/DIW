let h1RES = document.getElementById("resultado");

document.getElementById("buttao").onclick = function () {
    let nota1 = parseFloat(document.getElementById("nota1").value);
    let nota2 = parseFloat(document.getElementById("nota2").value);
    let nota3 = parseFloat(document.getElementById("nota3").value);
    if (
        typeof nota1 === "number" &&
        typeof nota2 === "number" &&
        typeof nota3 === "number"
    ) {
        let media = (nota1 + nota2 + nota3) / 3;
        h1RES.innerHTML = `A média é: ${media.toFixed(2)}`;
        alert(`A média é: ${media.toFixed(2)}`);
        return media.toFixed(2);
    } else {
        h1RES.innerHTML = `Digite apenas números.`;
        alert("Digite apenas números!!");
        return "ERRO: Digite apenas números.";
    }
};
