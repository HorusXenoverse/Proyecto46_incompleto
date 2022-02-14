class Game{
    constructor(){}

//Función para obtener el gameState
getState(){
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value",function(data){gameState = data.val(); });
}
//Función para actualizar el gameState
updateState(state){
    database.ref('/').update({gameState: state});
}

//Funcioón asíncrona para q el juego inicie cuando estén los jugadores necesarios
async start(){
if(gameState == 0){
player = new Player();
var playerCountRef = await database.ref('playerCount').once("value");

if(playerCountRef.exists()){
 playerCount = playerCountRef.val();
 player.getCount();
}

form = new Form();
form.display();
}
//Los sprites de los jugadores
pj1 = createSprite(200,100,50,50);
pj1.addImage(pj1Img);
pj1.scale = 0.5;

pj2 = createSprite(1200,100,50,50);
pj2.addImage(pj1Img);
pj2.scale = 0.5;

pjs = [pj1, pj2];

}

//LA FUNCIÓN PLAY O LA FUNCIO DE JUEGO
play(){
    if(bgInfinito.y>400){
     bgInfinito.y = 100;
    }

 //La función que se manda a llamar para hacer que los jugadores se muevan (allPlayers)
  Player.playerInfo();

//Función para hacer aparecer los obstáculos (se encuentra en el sketch en lo último de abajo)
spawnObstacles();

//Función para que los jugadores se muevan con las flechas
if(allPlayers !== undefined){ 
    var index = 0;
    var x = 200;

  //Se utiliza para recorrer la matríz "allPlayers" que es la que tiene los 2 jugadores
    for(var plr in allPlayers){
      
      index = index + 1 ;
      x = x+1000;

       x = displayHeight - allPlayers[plr].distance;
      pjs[index-1].x = x;
      //pjs[index-1].y = y;

//Este "if" es para saber que jugador soy (se marca con un círculo rojo)
      if (index === player.index){

       // fill("red");
       // stroke(10);
       // pjs[index - 1].shapeColor = "red";

//Este "if" es para mover a el jugador con la flecha de la izquierda
        if(keyIsDown(LEFT_ARROW) && player.index !== null){
          player.distance +=3
          player.updateName();
        }
//Este "if" es para mover a el jugador con la flecha de la derecha
        if(keyIsDown(RIGHT_ARROW) && player.index !== null){
          player.distance -=3
          player.updateName();
        }

  //Si el jugador toca un obstáculo se acaba el juego
  if(obstaclesGroup.isTouching(pj1,pj2)){
    game.updateState(2);
  }

      }
    }
  }

}

end(){
  obstaclesGroup.setVelocityYEach(0);
  bgInfinito.velocityY = 0;

  text("GAME OVER", displayWidth/2, displayHeight/2);

}

}