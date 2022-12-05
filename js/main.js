let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false;

const SCALE = 2;
const HEIGHT = 144;
const SCALED_HEIGHT = SCALE * HEIGHT;

const deadLoop = [0, 1, 2, 3, 4, 5, 6];

const subHurtLoop = [0, 1, 2, 3, 4];
const subIdleLoop = [0, 1, 2, 3, 4, 5, 6, 7];
const subKameLoop = [0, 1, 1, 1, 1, 1];
const subKamehaLoop = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];//Array.from(Array(13).keys())
const subKickLoop = [0, 1, 2, 3, 4];
const subOneTwoLoop = [0, 1, 2, 3, 4, 5];
const subRunLoop = [0, 1, 2, 3, 4, 5];
const subWalkingingLoop = [0, 1, 2, 3, 4, 5, 6, 7];
const subFriendLoop = [0, 1, 2, 3, 4, 5];

const kanoHurtLoop = [4, 3, 2, 1, 0];
const kanoIdleLoop = [7, 6, 5, 4, 3, 2, 1, 0];
const kanoKameLoop = [20, 19, 19, 19, 19, 19];
const kanoKamehaLoop = [18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const kanoKickLoop = [4, 3, 2, 1, 0, 0];
const kanoOneTwoLoop = [5, 4, 3, 2, 1, 0];
const kanoRunLoop = [5, 4, 3, 2, 1, 0];
const kanoFreezedLoop = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const kanoWalkingingLoop = [7, 6, 5, 4, 3, 2, 1, 0];
const kanoBabyLoop = [0];

let keyPresses = {};
let currentLoopIndexSub = 0;
let currentLoopIndexkano = 0;
let kameLoopSub = 0;
let kameLoopkano = 0;
let frameCount = 0;
let positionX = 0;
let positionY = 0;

let pos_sub = 0;
let pos_kano = 450
let pos_kamesub = pos_sub + 120;
let pos_kamekano = pos_kano - 120;

let frienship = false;
let babality = false;

let subHurt = new Image();
let subIdle = new Image();
let subKameha = new Image();
let subKick = new Image();
let subOneTwo = new Image();
let subRun = new Image();
let subWalking = new Image();
let subDead = new Image();
let subFriend = new Image();

let kanoHurt = new Image();
let kanoIdle = new Image();
let kanoKameha = new Image();
let kanoFreezed = new Image();
let kanoKick = new Image();
let kanoOneTwo = new Image();
let kanoRun = new Image();
let kanoWalking = new Image();
let kanoDead = new Image();
let kanoBaby = new Image();


let kick_sub = false;
let oneTwo_sub = false;
let kameha_sub = false;
let sub_ha = false;
let sub_damaged = false;

let kick_kano = false;
let oneTwo_kano = false;
let kameha_kano = false;
let kano_ha = false;
let kano_damaged = false;
let freezed = false;

let babalityMode = new Image();
let finishMode = new Image();
let friendMode = new Image();

let audio = new Audio('/src/assets/sons/Finish.mp3'); // finish music
let audio2 = new Audio('/src/assets/sons/babality.mp3'); // babality music
let audio3 = new Audio('/src/assets/sons/Friendship.mp3'); // friendship msic
let audio4 = new Audio('/src/assets/sons/CDP.mp3'); // Coup de poing music 
let audio5 = new Audio('/src/assets/sons/CDPI.mp3'); // coup de pied music
let audio6 = new Audio('/src/assets/sons/iceBall.mp3'); // iceball subzero music
let audio7 = new Audio('/src/assets/sons/fireBall.mp3'); // fireBall kano music


//Source des images
subHurt.src = "src/assets/SubZero/Sub_hurt.png"
subIdle.src = "src/assets/SubZero/Sub_idle.png";
subKameha.src = "src/assets/SubZero/Sub_Kameha.png"
subKick.src = "src/assets/SubZero/Sub_kick.png"
subOneTwo.src = "src/assets/SubZero/Sub_OneTwo.png"
subRun.src = "src/assets/SubZero/Sub_Run.png"
subWalking.src = "src/assets/SubZero/Sub_Walk.png";
subDead.src = "src/assets/SubZero/dead.png"
subFriend.src = "src/assets/SubZero/friendship.png"

kanoHurt.src = "src/assets/Kano/hurt.png";
kanoIdle.src = "src/assets/Kano/idle.png";
kanoKameha.src = "src/assets/Kano/kamehameha.png";
kanoFreezed.src = "src/assets/Kano/Kano_freezed.png";
kanoKick.src = "src/assets/Kano/kick.png";
kanoOneTwo.src = "src/assets/Kano/OneTwo.png";
kanoRun.src = "src/assets/Kano/run.png";
kanoWalking.src = "src/assets/Kano/walking-sheet.png";
kanoDead.src = "src/assets/Kano/dead.png"
kanoBaby.src = "src/assets/Kano/baby.png"

babalityMode.src = "/src/assets/images/babality.png"
finishMode.src = "/src/assets/images/finish.png"
friendMode.src = "/src/assets/images/friendship.png"


window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
     keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
     keyPresses[event.key] = false;
}

function drawFrame(image, largeur, frameX, position) {
     ctx.drawImage(image, frameX * largeur, 0 * HEIGHT, largeur, HEIGHT, position, 160, SCALE * largeur, SCALED_HEIGHT);

}

class HealthBar {
     constructor(x, y, width, height, maxHealth, color) {
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          this.maxHealth = maxHealth;
          this.health = maxHealth;
          this.color = color;
     }
     draw() {
          ctx.fillRect(this.x, this.y, this.width, this.height);
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, this.width * (this.value / this.maxHealth), this.height);
          ctx.lineWidth = 3;
          ctx.strokeStyle = "black";
          ctx.strokeRect(this.x, this.y, this.width, this.height);
          //ctx.fillText()
     }
     updatehealth(health) {
          this.health -= health;
          if (this.health <= 0) {
               this.health = 0;
               console.log("Game Over");
          }
     }
}
let health = 200;
const healthBarWidth = 220;
const healthBarHeight = 30;
let HealthBarSub = new HealthBar(10, 10, healthBarWidth, healthBarHeight, health, "green");
let HealthBarkano = new HealthBar(410, 10, healthBarWidth, healthBarHeight, health, "green");


function animationsSubzero() {
     HealthBarSub.draw();
     let hasMoved = false;
     let forward = true;
     let sprint = false;

     //code de deplacements et d'attaques
     if (keyPresses.a && !is_sub_dead && !frienship) {
          if(0<pos_sub){
               pos_sub -= 10;
          }
          hasMoved = true;
          forward = false;
     } else if (keyPresses.d && !is_sub_dead && !frienship) { //reculer
          if (pos_sub + 60<pos_kano){
               pos_sub += 10;
          }
          hasMoved = true;
          forward = true;
          if(HealthBarkano.health < 50){
               freezed = true;
          }
     } else if (keyPresses.Shift && !is_sub_dead && !frienship) { //courir
          sprint = true;
          hasMoved = true;
          if (pos_sub + 60<pos_kano){
               pos_sub += 25;
          }
          //console.log(createSubBox);
     } else if (keyPresses.e && !is_sub_dead && !frienship) {
          kick_sub = true;
          currentLoopIndexSub = 0;
     } else if (keyPresses.r && !is_sub_dead && !frienship) { //coups de poing
          oneTwo_sub = true;
          currentLoopIndexSub = 0;
          //audio4.pause();
     } else if (keyPresses.t && !is_sub_dead && !frienship) {
          kameha_sub = true;
          sub_ha = true;
          currentLoopIndexSub = 0;
          pos_kamesub = pos_sub + 120;

     } else if (keyPresses.f && is_kano_dead) {
          frienship = true;
          currentLoopIndexSub = 0;
     }


     if (hasMoved && forward && !sprint && !is_sub_dead && !frienship) {
          if (currentLoopIndexSub >= subWalkingingLoop.length) {
               currentLoopIndexSub = 0;
          }
          drawFrame(subWalking, 48, subWalkingingLoop[currentLoopIndexSub], pos_sub);
          currentLoopIndexSub++;
     }
     // animation de sprint vers l'avant
     else if (hasMoved && forward && sprint && !is_sub_dead && !frienship) {
          if (currentLoopIndexSub >= subRunLoop.length) {
               currentLoopIndexSub = 0;
          }
          drawFrame(subRun, 48, subRunLoop[currentLoopIndexSub], pos_sub);
          currentLoopIndexSub++;
     }
     //animation de marche vers l'arriere
     else if (hasMoved && !forward && !is_sub_dead && !frienship) {
          if (currentLoopIndexSub == 0) {
               currentLoopIndexSub = 7;
          }
          drawFrame(subWalking, 48, subWalkingingLoop[currentLoopIndexSub], pos_sub);
          currentLoopIndexSub--;
     }
     //animation d'idle
     else if (!hasMoved && !kick_sub && !oneTwo_sub && !sub_ha && !sub_damaged && !is_sub_dead && !frienship) {
          if (currentLoopIndexSub == (subIdleLoop.length - 1)) {
               currentLoopIndexSub = 0;
          }
          drawFrame(subIdle, 48, subIdleLoop[currentLoopIndexSub], pos_sub)
          currentLoopIndexSub++;
     }
     // animation de coups de pieds
     else if (kick_sub && !is_sub_dead && !frienship) {
          if (currentLoopIndexSub >= subKickLoop.length) {
               currentLoopIndexSub = 0;
               kick_sub = false;
          }
          if (currentLoopIndexSub == 5) {
               HealthBarkano.health -= 10;
               console.log(HealthBarkano.health);
          }
          if (kick_sub && (pos_sub + 160) >= (pos_kano)) {
          }
               drawFrame(subKick, 80, subKickLoop[currentLoopIndexSub], pos_sub);
               currentLoopIndexSub++;
          }
     
     // animation jab droite
     else if (oneTwo_sub && !is_sub_dead && !frienship) {
          if (currentLoopIndexSub >= subOneTwoLoop.length) {
               currentLoopIndexSub = 0;
               oneTwo_sub = false;
          }
          drawFrame(subOneTwo, 64, subOneTwoLoop[currentLoopIndexSub], pos_sub);
          currentLoopIndexSub++;
     }

     else if (sub_ha && !is_sub_dead && !frienship) {
          if (currentLoopIndexSub >= subKameLoop.length) {
               currentLoopIndexSub = 0;
               sub_ha = false;
          }
          drawFrame(subKameha, 112, subKameLoop[currentLoopIndexSub], pos_sub);
          currentLoopIndexSub++;
     }

     if (kameha_sub && !is_sub_dead && !frienship) {
          if (kameLoopSub >= subKamehaLoop.length) {
               kameLoopSub = 0;
               kameha_sub = false;
          }
          drawFrame(subKameha, 112, subKamehaLoop[kameLoopSub], pos_kamesub);
          kameLoopSub++;
          if (pos_kamesub <= pos_kano) {
               pos_kamesub += 5;
          }
     }


     //subzero au sol
     else if (sub_damaged && !is_sub_dead && !frienship) {
          if (currentLoopIndexSub >= subHurtLoop.length) {
               currentLoopIndexSub = 0
               sub_damaged = false;
          }
          drawFrame(subHurt, 96, subHurtLoop[currentLoopIndexSub], pos_sub);
          currentLoopIndexSub++;
     }

     else if (is_sub_dead && !frienship) {
          if (currentLoopIndexSub >= deadLoop.length) {
               currentLoopIndexSub = 0;
          }
          drawFrame(subDead, 48, deadLoop[currentLoopIndexSub], pos_sub);
          currentLoopIndexSub++;
     }

     else if (frienship && !is_sub_dead) {
          if (currentLoopIndexSub >= subFriendLoop.length) {
               currentLoopIndexSub = 5;
          }
          if(HealthBarkano.health <=0){
               freezed = true;
               frienship = true;
          }
          //ctx.drawImage(subFriend,subFriendLoop[currentLoopIndexSub] * 64, 0 * 144, 64, 144, pos_sub, 140, SCALE * 64, SCALE * 144 )
          drawFrame(subFriend, 64, subFriendLoop[currentLoopIndexSub], pos_sub);
          currentLoopIndexSub++;
     }
}


let is_kano_dead = false;
let is_sub_dead = false;

function animationskano() {
     HealthBarkano.draw();
     let k_hasMoved = false;
     let forward = true;
     let sprint = false;


     if (keyPresses.ArrowLeft && !is_kano_dead && !babality && !freezed) {
          if (pos_kano>pos_sub+60){
               pos_kano -= 10;
          }
          k_hasMoved = true;
          forward = false;
     } else if (keyPresses.ArrowRight && !is_kano_dead && !babality && !freezed) {
          if (pos_kano + 90<canvas.width){
               pos_kano += 10;
          }
          k_hasMoved = true;
          forward = false;
     } else if (keyPresses.l && !is_kano_dead && !babality && !freezed) {
          sprint = true;
          k_hasMoved = true;
          if (pos_kano> pos_sub+60){
               pos_kano -= 25;
          }
     } else if (keyPresses.i && !is_kano_dead && !babality && !freezed) {
          kick_kano = true;
          currentLoopIndexkano = 0;
     } else if (keyPresses.o && !is_kano_dead && !babality && !freezed) {
          oneTwo_kano = true;
          currentLoopIndexkano = 0;
     } else if (keyPresses.p && !is_kano_dead && !babality && !freezed) {
          kameha_kano = true;
          kano_ha = true;
          currentLoopIndexkano = 0;
          pos_kamekano = pos_kano - 120;
     } else if (keyPresses.u && is_sub_dead ) {
          babality = true;
          currentLoopIndexkano = 0;
     }


     if (k_hasMoved && !forward && !sprint && !is_kano_dead && !babality && !freezed) {
          if (currentLoopIndexkano >= kanoWalkingingLoop.length) {
               currentLoopIndexkano = 0;
          }
          drawFrame(kanoWalking, 48, kanoWalkingingLoop[currentLoopIndexkano], pos_kano);
          currentLoopIndexkano++;
     }
     // animation de sprint vers l'avant
     else if (k_hasMoved && forward && sprint && !is_kano_dead && !babality && !freezed) {
          if (currentLoopIndexkano >= kanoRunLoop.length) {
               currentLoopIndexkano = 0;
          }
          drawFrame(kanoRun, 48, kanoRunLoop[currentLoopIndexkano], pos_kano);
          currentLoopIndexkano++;
     }
     //animation de marche vers l'arriere
     else if (k_hasMoved && forward && !is_kano_dead && !babality && !freezed) {
          if (currentLoopIndexkano == 0) {
               currentLoopIndexkano = 7;
          }
          drawFrame(kanoWalking, 48, kanoWalkingingLoop[currentLoopIndexkano], pos_kano);
          currentLoopIndexkano--;
     }
     //animation d'idle
     else if (!k_hasMoved && !kick_kano && !oneTwo_kano && !kano_ha && !kano_damaged && !freezed && !is_kano_dead && !babality && !freezed) {
          if (currentLoopIndexkano == (subIdleLoop.length - 1)) {
               currentLoopIndexkano = 0;
          }
          drawFrame(kanoIdle, 48, subIdleLoop[currentLoopIndexkano], pos_kano)
          currentLoopIndexkano++;
     }
     // animation de coups de pieds
     else if (kick_kano && !is_kano_dead && !babality && !freezed) {
          if (currentLoopIndexkano >= kanoKickLoop.length) {
               currentLoopIndexkano = 0;
               kick_kano = false;
          }
          drawFrame(kanoKick, 80, kanoKickLoop[currentLoopIndexkano], pos_kano);
          currentLoopIndexkano++;
     }
     // animation jab droite
     else if (oneTwo_kano && !is_kano_dead && !babality && !freezed) {
          if (currentLoopIndexkano >= kanoOneTwoLoop.length) {
               currentLoopIndexkano = 0;
               oneTwo_kano = false;
          }

          drawFrame(kanoOneTwo, 64, kanoOneTwoLoop[currentLoopIndexkano], pos_kano);
          currentLoopIndexkano++;
     }
     //subzero blesse
     else if (kano_damaged && !is_kano_dead && !babality && !freezed) {
          if (currentLoopIndexSub >= kanoHurtLoop.length) {
               currentLoopIndexSub = 0
               kano_damaged = false;
          }
          drawFrame(kanoHurt, 96, kanoHurtLoop[currentLoopIndexSub], pos_kano);
          currentLoopIndexkano++;
     }
     else if (freezed && !is_kano_dead && !babality) {
          if (currentLoopIndexkano >= kanoFreezedLoop.length) {
               currentLoopIndexkano = 0
               freezed = false;
          }
          drawFrame(kanoFreezed, 48, kanoFreezedLoop[currentLoopIndexkano], pos_kano);
          currentLoopIndexkano++;
     }
     else if (kano_ha && !is_kano_dead && !babality && !freezed) {
          if (currentLoopIndexkano >= kanoKameLoop.length) {
               currentLoopIndexkano = 0;
               kano_ha = false;
          }
          drawFrame(kanoKameha, 64, kanoKameLoop[currentLoopIndexkano], pos_kano);
          currentLoopIndexkano++;
     }

     if (kameha_kano && !is_kano_dead && !babality) {
          if (kameLoopkano >= kanoKamehaLoop.length) {
               kameLoopkano = 0;
               kameha_kano = false;
          }

          drawFrame(kanoKameha, 64, kanoKamehaLoop[kameLoopkano], pos_kamekano);
          kameLoopkano++;
          if (pos_kamekano >= pos_sub) {
               pos_kamekano -= 15;
          }
     }

     else if (is_kano_dead && !babality && !freezed) {
          if (currentLoopIndexkano >= deadLoop.length) {
               currentLoopIndexkano = 0;
          }
          drawFrame(kanoDead, 48, deadLoop[currentLoopIndexkano], pos_kano);
          currentLoopIndexkano++;
     }

     else if (babality && !is_kano_dead && !freezed) {
          if (currentLoopIndexkano >= kanoBabyLoop.length) {
               currentLoopIndexkano = 0;
          }
          drawFrame(kanoBaby, 64, kanoBabyLoop[currentLoopIndexkano], pos_kano);
     }

}
function kanoLife(){
     if (kick_sub && (pos_sub + 120) >= (pos_kano)) {
          audio5.play();
          if (subKickLoop[currentLoopIndexSub] == 3) {
               health -= 20;
               //console.log(health);
               if (health > 0) {
                    HealthBarkano.width = health;
               }
               if (health <= 0) {
                    is_kano_dead = true;
                    HealthBarkano.width = 0;
                    console.log("Game Over kano");
               }
          }
     }

     if (oneTwo_sub && (pos_sub + 102) >= (pos_kano)) {
          audio4.play();
          if (subOneTwoLoop[currentLoopIndexSub] == 4) {
               health -= 20;
               //console.log(health);
               if (health > 0) {
                    HealthBarkano.width = health;
               }
               if (health <= 0) {
                    is_kano_dead = true;
                    HealthBarkano.width = 0;
                    //console.log("Game Over kano");
               }
          }

     }
     if (kameha_sub && (pos_kamesub + 160) >= (pos_kano)) {
          audio6.play();
          if (subKamehaLoop[kameLoopSub] == 13) {
               health -= 30;
               freezed = true;
               //console.log(health);
               if (health > 0) {
                    HealthBarkano.width = health;
               }
               if (health <= 0) {
                    is_kano_dead = true;
                    HealthBarkano.width = 0;
                    console.log("Game Over kano");
                    
               }
          }
     }
     if(is_kano_dead){
          audio.play();
          ctx.drawImage(finishMode,180,80,300,100);
          
     }
     if(is_kano_dead && frienship){
          audio.pause();
          ctx.clearRect(180,80,300,100);
          audio3.play();
          ctx.drawImage(friendMode,180,80,300,100);
     }
}

function subLife(){
     if (kick_kano &&(pos_sub + 80) >= (pos_kano)){
          audio5.play();
          if (kanoKickLoop[currentLoopIndexkano] == 1){
               health -= 20;
            //   console.log(health);
               if(health > 0){
                    HealthBarSub.width = health;
               }
               if(health <= 0){
                    is_sub_dead = true;
                    HealthBarSub.width = 0;
                    console.log("Game Over SubZero");
               }
          }
     } 

     if ( oneTwo_kano && (pos_kano) <= (pos_sub + 70)) {
          audio4.play();
          if (kanoOneTwoLoop[currentLoopIndexkano] == 0) {
               health -= 10;
               //console.log(health);
               if (health > 0) {
                    HealthBarSub.width = health;
               }
               if (health <= 0) {
                    is_sub_dead = true;
                    HealthBarSub.width = 0;
                    console.log("Game Over SubZero");
               }
          }
     }

     if (kameha_kano && ((pos_kamekano) <= (pos_sub + 64))) {
          audio7.play();
          if (kanoKamehaLoop[kameLoopkano] == 13) {
               health -= 30;
               //console.log(health);
               if (health > 0) {
                    HealthBarSub.width = health;
               }
               if (health <= 0) {
                    is_sub_dead = true;
                    HealthBarSub.width = 0;
                    console.log("Game Over SubZero");
               }
          }
     }

     if(is_sub_dead){
          audio.play();
          ctx.drawImage(finishMode,180,80,300,100);
          
     }
     if(is_sub_dead && babality){
          audio.pause();
          ctx.clearRect(180,80,300,100);
          audio2.play();
          ctx.drawImage(babalityMode,180,80,300,100);
     }
}


function update() {

     ctx.clearRect(0, 0, canvas.width, canvas.height);
     subLife();
     kanoLife();
     animationsSubzero();
     animationskano();

}
setInterval(update, 100);