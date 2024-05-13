var operacao;
function askAgain() {
    let p = document.getElementById("opt");
    p.innerHTML =
        "Qual operação deseja fazer? (soma, subtração, multiplicação, divisão)";
    operacao = prompt(
        "Qual operação deseja fazer? (soma, subtração, multiplicação, divisão)"
    );
    if (operacao == "soma") {
        p.innerHTML = "Soma";
        operacao = 1;
    } else if (operacao == "subtração") {
        p.innerHTML = "Subtração";
        operacao = 2;
    } else if (operacao == "multiplicação") {
        p.innerHTML = "Multiplicação";
        operacao = 3;
    } else if (operacao == "divisão") {
        p.innerHTML = "Divisão";
        operacao = 4;
    } else {
        p.innerHTML = "Operação inválida";
        alert("Operação inválida");
        askAgain();
    }
}

askAgain();
alert("Insira os números para a operação");
document.getElementById("again").onclick = askAgain;

function calcular() {
    var res = document.getElementById("resultado");
    let n1 = parseFloat(document.getElementById("num1").value);
    let n2 = parseFloat(document.getElementById("num2").value);
    if (typeof n1 !== "number" || typeof n2 !== "number") {
        alert("Insira um número válido");
        askAgain();
        return false;
    }
    if (operacao == 1) {
        let soma = n1 + n2;
        res.innerHTML = n1 + n2;
        alert(`O resultado é: ${soma}`);
    } else if (operacao == 2) {
        let sub = n1 - n2;
        res.innerHTML = n1 - n2;
        alert(`O resultado é: ${sub}`);
    } else if (operacao == 3) {
        let mult = n1 * n2;
        res.innerHTML = n1 * n2;
        alert(`O resultado é: ${mult}`);
    } else if (operacao == 4) {
        let div = n1 / n2;
        res.innerHTML = n1 / n2;
        alert(`O resultado é: ${div}`);
    }
}
