// Seleciona os elementos
const elementoResultado = document.getElementById("resultado");
const elementoComprimento = document.getElementById("comprimento");
const elementoMinuscula = document.getElementById("minusculas");
const elementoMaiuscula = document.getElementById("maiusculas");
const elementoNumero = document.getElementById("numeros");
const elementoSimbolo = document.getElementById("simbolos");
const botaoCopiar = document.getElementById("botao-copiar");
const botaoGerar = document.getElementById("gerar");

function gerarMinusculaAleatorio() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 97)
}

function gerarMaiusculaAleatorio() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 65)
}

function gerarNumeroAleatorio() {
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
}

function gerarSimboloAleatorio() {
    const simbolos = "!@#$%&*(){}[]=<>/,.'";
    return simbolos[Math.floor(Math.random() * simbolos.length)];
}

const funcaoAleatoria = {
    minuscula: gerarMinusculaAleatorio,
    maiuscula: gerarMaiusculaAleatorio,
    numero: gerarNumeroAleatorio,
    simbolo: gerarSimboloAleatorio
}

function gerarSenhaAleatoria(
    minuscula,
    maiuscula,
    numero,
    simbolo,
    comprimento_senha
) {
    
    // 1. Inicializar variável 'senha'
    // 2. Filtrar configurações não ativas
    // 3. Repetir um número de vezes igual ao comprimento da senha e chamar uma função geradora para cada configuração
    // 4. Adicionar o caractere à senha
    // 5. Retornar a senha

    let senha_gerada = "";

    const configuracoesContador = minuscula + maiuscula + numero + simbolo;

    console.log("configuracoesContaodor: " + configuracoesContador);

    const listaDeConfiguracoes = [{minuscula},{maiuscula},{numero}, {simbolo}].filter(item => Object.values(item)[0]);
    
    if (configuracoesContador === 0) {
        return "";
    }

    for (let i = 0; i < comprimento_senha; i += configuracoesContador) {

        listaDeConfiguracoes.forEach(configuracao => {
            
            const nomeFuncao = Object.keys(configuracao)[0];

            senha_gerada += funcaoAleatoria[nomeFuncao]();
        })
    }

    const senha_final = senha_gerada.slice(0, comprimento_senha);

    return senha_final;
}


botaoGerar.addEventListener("click", () => {
    
    const comprimento_senha = Number(elementoComprimento.value);

    const possuiMinuscula = elementoMinuscula.checked;
    const possuiMaiuscula = elementoMaiuscula.checked;
    const possuiNumero = elementoNumero.checked;
    const possuiSimbolo = elementoSimbolo.checked;

    elementoResultado.innerText = gerarSenhaAleatoria(
        possuiMinuscula,
        possuiMaiuscula,
        possuiNumero,
        possuiSimbolo,
        comprimento_senha
    );
})

botaoCopiar.addEventListener("click", () => {

    const senha = elementoResultado.innerText;

    if (!senha) {
        return;
    }

    navigator.clipboard.writeText(senha);

    alert("Senha copiada! :)")
})