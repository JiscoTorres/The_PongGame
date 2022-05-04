/*************************** Criação das variáveis utilziadas no código ***************************/
var canvas, context,
    barraWidth, barraHeigth,
    jogadorPosX, jogadorPosY,
    TeclaCimaPressionada_jogador_01, TeclaBaixoPressionada_jogador_01,
    TeclaCimaPressionada_jogador_02, TeclaBaixoPressionada_jogador_02,
    oponentePosX, oponentePosY,
    oponenteParaCima,
    bolaRaio,
    bolaPosX, bolaPosY,
    bolaParaDireita,
    bolaAngulo,
    bolaTempo,
    velocidadeJogador, velocidadeOponente,
    velocidadeBola,
    pontosJogador, pontosOponente;

    var escolha_da_dificuldade=false

    var som_ponto=new Audio('sons_pong/Ponto.mp3');
    var som_rebote=new Audio('sons_pong/Rebote.mp3')
    var som_lateral=new Audio('sons_pong/Lateral.mp3')
    var som_vitoria=new Audio('sons_pong/som_vitoria_10pts.mp3')
    var som_inicio=new Audio('sons_pong/musicasdojogo.mp3')

    var vitorias_oponente = false;
    var vitorias_jogador = false;
    var contador_de_pontos_totais = 0
    var contador_de_pontos_A = 0
    var contador_de_pontos_B = 0
    var resposta_ao_jogo = document.getElementById("res")
    var botao = document.getElementById('botao')
   
    
    // botao.addEventListener(click, "criacao_tela_canva")

    var jogo_comecou = false
 
    
    
    // while(jogo_comecou==false){

        
    // }
    
//OBS: Os sons interativos só funcionam quando há interação com as barrinhas do jogo 

function musica_inicio(){
    
    som_inicio.play()
    
   }




function iniciarJogo() {
    
   canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");



   

    //Configurações de largura, tamanho e posicionamento da barra
    barraWidth = 30;
    barraHeigth = 90;
    jogadorPosX = 0;
    jogadorPosY = (canvas.height - barraHeigth) / 2;
    TeclaBaixoPressionada_jogador_01 = false;
    TeclaCimaPressionada_jogador_01 = false;

    oponentePosX = canvas.width - barraWidth;
    oponentePosY = (canvas.height - barraHeigth) / 2;
    oponenteParaCima = false;

    //Configuração da dimensão e posicionamento inicial da bola
    bolaRaio = 10;
    bolaPosX = canvas.width / 2;
    bolaPosY = canvas.height / 2;

    bolaParaDireita = false;
    bolaAngulo = Math.floor(Math.random() * 21) - 10; // faz bola ir para uma direção aleatória.
    bolaTempo = 0;
    velocidadeJogador = 15;
    velocidadeOponente = 15;//tava 30
    velocidadeBola = 10;
    pontosJogador = 0;
    pontosOponente = 0;

   
    while(escolha_da_dificuldade==false){// escolha da dificuldade
       
        var dificuldade = prompt("Coloque a dificuldade do jogo de 1 a 9:")
        dificuldade = Number(dificuldade)

        if(dificuldade>0 && dificuldade<10){
            velocidadeBola =velocidadeBola*dificuldade
            escolha_da_dificuldade=true
        }

        else{
            alert('O valor digitado da dificuldade está fora do intervalo, digite novamente!')
            escolha_da_dificuldade=false
        }

       
        
        
        

    }

    //Mantém a tecla como "falso" para não realizar ação
    document.addEventListener('keyup', tecla_w, false);
    document.addEventListener('keydown', tecla_s, false);

    document.addEventListener('keyup', seta_cima, false);
    document.addEventListener('keydown', seta_baixo, false);

    setInterval(loopGame, 30);
    
       

}




//Verificação - Pressionando as teclas (Consulte as keys)

//Jogador 01
function tecla_w(e) {

    if (e.keyCode == 87) {
       
        TeclaCimaPressionada_jogador_01 = false;
    } else if (e.keyCode == 83) {
        TeclaBaixoPressionada_jogador_01 = false;
    }
}

function tecla_s(e) {
    if (e.keyCode == 87) {
       
      
        TeclaCimaPressionada_jogador_01 = true;
    } else if (e.keyCode == 83) {
        TeclaBaixoPressionada_jogador_01 = true;
    }
}

// Jogador 02
function seta_cima(e) {

    if (e.keyCode == 79) {
       
        TeclaCimaPressionada_jogador_02 = false;
    } else if (e.keyCode == 76) {
        TeclaBaixoPressionada_jogador_02 = false;
    }
}

function seta_baixo(e) {
    if (e.keyCode == 79) {
       
      
        TeclaCimaPressionada_jogador_02 = true;
    } else if (e.keyCode == 76) {
        TeclaBaixoPressionada_jogador_02 = true;
    }
}







function loopGame() {
    
   musica_inicio()
    
   /****************************** DESENHO DA TELA *****************************/  
   context.clearRect(0, 0, canvas.width, canvas.height); // limpar a tela antes de desenhar


   /****************************** JOGADOR & OPONENTE *****************************/  
   context.fillRect(jogadorPosX, jogadorPosY, barraWidth, barraHeigth); // desenha jogador
   context.fillRect(oponentePosX, oponentePosY, barraWidth, barraHeigth); // desenha ioponente


   /****************************** BOLA *****************************/  
   context.beginPath(); // modo desenho 
   context.arc(bolaPosX, bolaPosY, bolaRaio, 0, Math.PI * 2, true); // desenha o circulo com coordenadas no centro
   context.closePath(); // finaliza o caminho / não é obrigatório
   context.fillStyle = "#010103af";
   context.fill();

  


    /****************************** JOGADOR *****************************/  
    if (TeclaCimaPressionada_jogador_01 != TeclaBaixoPressionada_jogador_01) { // se o usuário precionar para cima
        if (TeclaCimaPressionada_jogador_01) { // se for para cima pressionado
            if (jogadorPosY > 0) { // se a bola não sair da tela
                jogadorPosY -= velocidadeJogador; // muda posição do jogador
            }
        }
        else { // se for para baixo 
            if (jogadorPosY < (canvas.height - barraHeigth)) { // se a bola não saiu da tela
                jogadorPosY += velocidadeJogador; // muda posição
            }
        }
    }

    
    /****************************** OPONENTE *****************************/  
    // if (oponenteParaCima) { // caso o oponente estiver indo para cima
    //     oponentePosY -= velocidadeOponente;
    //     if (oponentePosY <= 0) // se a bola estiver saindo da tela
    //     {
            
    //         oponenteParaCima = false;
    //     }
    // }
    // else { // se o oponente estiver se movendo para baixo
    //     oponentePosY += velocidadeOponente;
    //     if (oponentePosY >= canvas.height - barraHeigth) { // caso a bola estiver saindo da tela

    //         oponenteParaCima = true;
    //     }
    // }

//teste
if (TeclaCimaPressionada_jogador_02 != TeclaBaixoPressionada_jogador_02) { // se o usuário precionar para cima
    if (TeclaCimaPressionada_jogador_02) { // se for para cima pressionado
        if (oponentePosY > 0) { // se a bola não sair da tela
            oponentePosY -= velocidadeOponente; // muda posição do jogador
        }
    }
    else { // se for para baixo 
        if (oponentePosY < (canvas.height - barraHeigth)) { // se a bola não saiu da tela
            oponentePosY += velocidadeOponente; // muda posição
        }
    }
}











    /****************************** BOLA *****************************/  
    if (bolaTempo <= 0) // caso a bola estiver em jogo, o tempo  e zerado apos marcar ponto, abola ficará invisivel por um tempo
    {
        if ((bolaPosX - bolaRaio) <= (jogadorPosX + barraWidth)) { // caso o jogador encoste na bola no eixo X
            som_lateral.currentTime = 0
            
            som_lateral.play()
            if ((bolaPosY + bolaRaio > jogadorPosY) && (bolaPosY - bolaRaio < jogadorPosY + barraHeigth)) { // caso o jogador encoste na bola no eixo Y
                bolaParaDireita = true;
                if (TeclaBaixoPressionada_jogador_01) { // se o usuário estiver indo para baixo e tocar na bola
                    bolaAngulo = Math.floor(Math.random() * 10) - 9; // manda bola para diagonal para cima
                }
                else {
                    bolaAngulo = Math.floor(Math.random() * 10); // manda bola para diagonal para baixo
                }
            }
        }
        else {
            if ((bolaPosX + bolaRaio) >= oponentePosX) { // se o oponente encostar na bola no eixo X
                som_lateral.currentTime = 0
                som_lateral.play()
                
                if ((bolaPosY + bolaRaio) > oponentePosY && (bolaPosY - bolaRaio < oponentePosY + barraHeigth)) { // se o oponente encostar na bola no eixo Y

                    bolaParaDireita = false;
                    if (oponenteParaCima) { // caso oponetne estiver indo para cima ao tocar na bola
                        
                        bolaAngulo = Math.floor(Math.random() * 10) - 9; // manda bola para diagonal para cima
                    }
                    else { // caso o oponente estiver indo para baixo quando tocar na bola
                        bolaAngulo = Math.floor(Math.random() * 10); // manda bola para diagonal para baixo
                    }
                }
            }
        }

        if ((bolaPosY - bolaRaio <= 0) || (bolaPosY + bolaRaio > canvas.height)) { // se a bola estiver indo para cima ou para baixo na tela
        
           
            som_rebote.play() // bola bate nos cantos do canva
            bolaAngulo = bolaAngulo * -1; // multiplicamos por - 1 para inverter a direção da bola no eixo y
        }
        bolaPosY += bolaAngulo; // move bola para cima ou para baixo de acordo com o calculo acima

        if (bolaParaDireita) {
            bolaPosX += velocidadeBola; // move a bola para direita
        }
        else {
            bolaPosX -= velocidadeBola; // move a bola para esquerda
        }
    }

    if ((bolaPosX <= -bolaRaio) || (bolaPosX > canvas.width)) { // se a bola saiu da tela
       
       
       
        if (bolaTempo >= 50) { // se o tempo de deixar a bola invisível passou 
            
            if (bolaPosX <= - bolaRaio) { // se bola saiu na esquerda 
             
                pontosOponente++;
               
                contador_de_pontos_totais =contador_de_pontos_A+contador_de_pontos_B
               
                if(pontosOponente%10==0 && contador_de_pontos_totais!=pontosOponente){
                   
                    som_vitoria.play()
                    resposta_ao_jogo.style.color = '#010103af'
                    resposta_ao_jogo.innerHTML = 'O jogador 2 alcançou 10 pontos'

                    setTimeout(function(){
                        resposta_ao_jogo.style.color = 'transparent'
                        
                    }, 1500)
                  
                 
                  
                    contador_de_pontos_totais=0
                }

                else if(pontosOponente%10==0 && pontosJogador==1){// foi utilizado para consertar um bug quando o jogador 1 faz somente um ponto e o 2 completa 10 pontos

                    som_vitoria.play()
                    resposta_ao_jogo.style.color = '#010103af'
                    resposta_ao_jogo.innerHTML = 'O jogador 2 alcançou 10 pontos'
                    setTimeout(function(){
                        resposta_ao_jogo.style.color = 'transparent'
                        
                    }, 1500)
                  
                 
                  
                    contador_de_pontos_totais=0
                }
                
              
                
                
            }
            else { // se bola saiu na direita 
                
                pontosJogador++;
                contador_de_pontos_totais =contador_de_pontos_A+contador_de_pontos_B
               
                if(pontosJogador%10==0 && contador_de_pontos_totais!=pontosJogador){
                   
                    som_vitoria.play()
                    resposta_ao_jogo.style.color = '#010103af'
                    resposta_ao_jogo.innerHTML = 'O jogador 1 alcançou 10 pontos'

                    setTimeout(function(){
                        resposta_ao_jogo.style.color = 'transparent'
                        
                    }, 1500)
                    
                   contador_de_pontos_totais=0
                  
                }

                else if(pontosJogador%10==0 && pontosOponente==1){// foi utilizado para consertar um bug quando o jogador 2 faz somente um ponto e o 1 completa 10 pontos
                    
                    som_vitoria.play()
                    resposta_ao_jogo.style.color = '#010103af'
                    resposta_ao_jogo.innerHTML = 'O jogador 1 alcançou 10 pontos'

                    setTimeout(function(){
                        resposta_ao_jogo.style.color = 'transparent'
                        
                    }, 1500)
                  
                 
                  
                    contador_de_pontos_totais=0
                }

                
            }
            
            bolaPosX = canvas.width / 2; // coloca bola no centro da tela
            bolaPosY = canvas.height / 2; // coloca bola no centro da tela

            bolaParaDireita = false;
            bolaAngulo = Math.floor(Math.random() * 21) - 10; // faz bola ir para uma direção aleatória.
            bolaTempo = 0; // zera o tempo de deixar a bola invisível e coloca novamente em jogo
        }
        else { // caso o tempo de deixar a bola invisível não acabou 
            bolaTempo++;
        }
     
        
    }


    /****************************** PLACAR *****************************/  
    
    var pontosA = pontosJogador; // variéveis temporarias para alterar pontuação
    var pontosB = pontosOponente;

    var pontosA_formatados;
    var pontosB_formatados;
    
    
    
    if (pontosA < 10) { // coloca zero a esquerda se for menor que 10 a pontuação 
        
        pontosA = "0" + pontosA;
     
     pontosA_formatados = pontosA.replace(/^./, "")//tira o primeiro caracter da string
    
     pontosA_formatados = Number(pontosA_formatados) 
     
     contador_de_pontos_A =  pontosA_formatados
     console.log(contador_de_pontos_A)
    

        
    }

    else{//se for maior igual a 10
        
     pontosA_formatados =  pontosA

     contador_de_pontos_A = pontosA_formatados

     console.log(contador_de_pontos_A)
    
    }


    
    if (pontosB < 10) { // voloca zero a esquerda se for menor que 10 a pontuação 
        
        pontosB = "0" + pontosB;
        
        pontosB_formatados = pontosB.replace(/^./, "")//tira o primeiro caracter da string
      
        pontosB_formatados = Number(pontosB_formatados)

        contador_de_pontos_B =  pontosB_formatados
        console.log(contador_de_pontos_B)
        
       

    }

    else{
       
        pontosB_formatados = pontosB

        contador_de_pontos_B =  pontosB_formatados
        console.log(contador_de_pontos_B)
       
    }


   


    context.font = "38pt Arial"; // tamanho e fonte
    context.fillStyle = "#010103af"; //Seleciona a cor
    context.fillText(pontosA + "  " + pontosB, (canvas.width / 2) - 70, 50); // escrevendo texto no centro da tela no top


    /****************************** LINHA DIVISÓRIA *****************************/ 
    context.beginPath();
    context.moveTo(canvas.width / 2, 0); // arrumar lápis para fazere a escrita da linha
    context.lineTo(canvas.width / 2, canvas.height);// faz risco na tela no centro
    context.strokeStyle = "#010103af";
    context.stroke();
    context.closePath();
}


/****************************** FUNÇÃO DO JQUERY *****************************/ 
 
$(function () {
   
    iniciarJogo();
   
});