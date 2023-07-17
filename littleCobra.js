
// APLICANDO TAGS HTML EM VARIAVEIS
const fild = document.querySelector(".fild");
const ctx = fild.getContext("2d");
const contador = document.querySelector('.contador');
const inicar_jogo = document.querySelector(".inicar_jogo");
const pause = document.querySelector('.pause');
const fim_de_jogo = document.querySelector(".fim_de_jogo");
const  counterTempo = document.querySelector(".counter");

// ---------------------------------------------

//Obj da cobrinha, e suas posicoes iniciais como atributos no canvas
let cobrinha = [
    {x: 50, y: 50}
];

//----Variavies principais do jogo---
let comecar = false;
let pontuacao = 0;
//   posicoes x e y para as frutas em 2 variavies
let fruta_x;
let fruta_y;

//varivaies dx e dy para mudar as posicoes no canvas
let dx = 1;
let dy = 0;


let velocidade = 110;
let moveUp = false, moveDown = false, moveLeft = false, moveRight = true;
let mudarDirecao = false;
//-------------------------

window.addEventListener("load",()=>{
    drawsFruta();
    drawsCobrinha();
    gerarFruta();
    window.addEventListener("keydown", keyDownHandler);
    inicar_jogo.addEventListener("click", ()=>{
        inicar_jogo.style.display = 'none';
        pause.style.display = "block";
        pause.display.position ="absolute";
        pause.style.top = "-3vh";
        pause.style.left = "36vw";
        comecar = true;
        uptade();
    });
    pause.addEventListener("click", ()=>{
        comecar= false;
        inicar_jogo.style.display = "block";
        inicar_jogo.innerHTML = "Continue";
    });

});

function uptade(){
    if()
}



