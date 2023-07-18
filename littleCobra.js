
// APLICANDO TAGS HTML EM VARIAVEIS
const fild = document.querySelector(".fild");
const ctx = fild.getContext("2d");
const contador = document.querySelector('.contador');
const inicar_jogo = document.querySelector(".inicar_jogo");
const pause = document.querySelector('.pause');
const fim_de_jogo = document.querySelector(".fim_de_jogo");
const counterTempo = document.querySelector(".counter");

// ---------------------------------------------

//Obj da cobrinha, e suas posicoes iniciais como atributos no canvas
let cobrinha = [
    { x: 50, y: 50 }
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

window.addEventListener("load", () => {
    drawsFruta();
    drawsCobrinha();
    gerarFruta();
    window.addEventListener("keydown", keyDownHandler);
    inicar_jogo.addEventListener("click", () => {
        inicar_jogo.style.display = 'none';
        pause.style.display = "block";
        pause.style.position = "absolute";
        pause.style.top = "-3vh";
        pause.style.left = "36vw";
        comecar = true;
        uptade();
    });
    pause.addEventListener("click", () => {
        comecar = false;
        inicar_jogo.style.display = "block";
        inicar_jogo.innerHTML = "Continue";
    });

});

function uptade() {
    if (comecar) {
        if (fim_de_jogo_funcao()) {
            pause.style.display = "none";
            fim_de_jogo.style.display = "block";
            counterTempo.style.display = "block";

            setInterval(() => {
                counterTempo.innerHTML -= 1;
                if (counterTempo.innerHTML == "0") location.reload();
            }, 1000);
            return;
        };
        setTimeout(() => {
            mudarDirecao = false;
            limparBoard();
            drawsFruta();
            moveCobrinha();
            drawsCobrinha();
            uptade();
        }, velocidade);
    }
}

function limparBoard() {
    ctx.fillStyle = "#ccc";
    ctx.StrokeStyle = "#000";
    ctx.fillRect(0, 0, fild.width, fild.height);
    ctx.strokeRect(0, 0, fild.width, fild.height);
};

function drawsCobrinha(){
    cobrinha.forEach((element)=>{
         drawsParteCobrinha(element);
    });
};

function drawsParteCobrinha(cobrinhaParte) {
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#fff";
    ctx.fillRect(cobrinhaParte.x, cobrinhaParte.y, 10, 10);
    ctx.strokeRect(cobrinhaParte.x, cobrinhaParte.y, 10, 10);
};

function drawsFruta() {
    ctx.beginPath();
    ctx.arc(fruta_x, fruta_y, 6, 8, 16);
    ctx.stroke();
    ctx.fillStyle = "#48e";
    ctx.fill();
    ctx.closePath();
};

function fim_de_jogo_funcao() {
    for (let i = 1; i < cobrinha.length; i++) {
        if (cobrinha[i].x === cobrinha[0].x && cobrinha[i].y === cobrinha[0].y) return true;
    }
    const hitLeftWall = cobrinha[0].x < 0;
    const hitRightWall = cobrinha[0].x > fild.width - 10;
    const hitToptWall = cobrinha[0].y < 0;
    const hitBottomtWall = cobrinha[0].y > fild.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomtWall;

};

function gerarFruta() {
    fruta_x = Math.floor((Math.random() * ((fild.width - 10) - 0) + 0) / 10) * 10;
    fruta_y = Math.floor((Math.random() * ((fild.height - 10) - 0) + 0) / 10) * 10;
    cobrinha.forEach((parte) => {
        if (parte.x == fruta_x && parte.y == fruta_y) { gerarFruta() };
    });

};

function keyDownHandler(event){
    const left = 37, right = 39, up = 38, down = 40;
    if(mudarDirecao) return;
    mudarDirecao = true;
    let key = event.keyCode;
    if(key === left && moveRight != true){
         moveUp = false, moveDown = false, moveLeft = true, moveRight = false;
    };
    if(key === right && moveLeft != true){
        moveUp = false, moveDown = false, moveLeft = false, moveRight = true;
    }
    if(key === up && moveDown != true){
        moveUp = true, moveDown = false, moveLeft = false, moveRight = false;
    };
    if(key === down && moveUp != true){
        moveUp = false, moveDown = true, moveLeft = false, moveRight = false;
    };

    if(moveLeft){dx = -1, dy = 0 };
    if(moveRight){dx = 1, dy = 0 };
    if(moveUp){dx = 0, dy = -1 };
    if(moveDown){dx = 0, dy = 1 };
};

function moveCobrinha(){
    const cabeca = {x: cobrinha[0].x + (dx * 10),y: cobrinha[0].y + (dy*10)};
    cobrinha.unshift(cabeca);
    if((cobrinha[0].x +10) >= fruta_x&& (cobrinha[0].x -5)<= fruta_x && (cobrinha[0].y +10) >= fruta_y && (cobrinha[0].y -5)<= fruta_y ){
        pontuacao += 1;
        contador.innerHTML= pontuacao;
        velocidade -= 0.75;
        gerarFruta();
    }else{
        cobrinha.pop()
    };
};