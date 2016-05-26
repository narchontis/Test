var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';
 
var HEIGHT = 500;
var WIDTH = 500;
var timeWhenGameStarted = Date.now();   //return time in ms
 
var frameCount = 0;
 
var score = 0;
var player;
 
createPlayer = function(){
        player = {
                type:'player',
                x:50,
                spdX:30,
                y:40,
                spdY:5,
                width:20,
                height:20,
                color:'green',
                //
                hp:10,
                atkSpd:1,
                attackCounter:0,
                aimAngle:0,
                //
                pressingDown:false,
                pressingUp:false,
                pressingLeft:false,
                pressingRight:false,
        };
}
 
 
var enemyList = {};
var upgradeList = {};
var bulletList = {};
 
getDistanceBetweenEntity = function (entity1,entity2){  //return distance (number)
        var vx = entity1.x - entity2.x;
        var vy = entity1.y - entity2.y;
        return Math.sqrt(vx*vx+vy*vy);
}
 
testCollisionEntity = function (entity1,entity2){       //return if colliding (true/false)
        var rect1 = {
                x:entity1.x-entity1.width/2,
                y:entity1.y-entity1.height/2,
                width:entity1.width,
                height:entity1.height,
        }
        var rect2 = {
                x:entity2.x-entity2.width/2,
                y:entity2.y-entity2.height/2,
                width:entity2.width,
                height:entity2.height,
        }
        return testCollisionRectRect(rect1,rect2);
       
}
 
Enemy = function(id,x,y,spdX,spdY,width,height){
        var enemy3 = {
                type:'enemy',
                x:x,
                spdX:spdX,
                y:y,
                spdY:spdY,
                id:id,
                width:width,
                height:height,
                color:'red',
                //
                aimAngle:0,
                atkSpd:1,
                attackCounter:0,
        };
        enemyList[id] = enemy3;
       
}
 
randomlyGenerateEnemy = function(){
        //Math.random() returns a number between 0 and 1
        var x = Math.random()*WIDTH;
        var y = Math.random()*HEIGHT;
        var height = 10 + Math.random()*30;     //between 10 and 40
        var width = 10 + Math.random()*30;
        var id = Math.random();
        var spdX = 5 + Math.random() * 5;
        var spdY = 5 + Math.random() * 5;
        Enemy(id,x,y,spdX,spdY,width,height);
       
}
 
Upgrade = function (id,x,y,spdX,spdY,width,height,category,color){
        var asd = {
                type:'upgrade',
                x:x,
                spdX:spdX,
                y:y,
                spdY:spdY,
                name:'E',
                id:id,
                width:width,
                height:height,
                color:color,
                //
                category:category,
        };
        upgradeList[id] = asd;
}
 
randomlyGenerateUpgrade = function(){
        //Math.random() returns a number between 0 and 1
        var x = Math.random()*WIDTH;
        var y = Math.random()*HEIGHT;
        var height = 10;
        var width = 10;
        var id = Math.random();
        var spdX = 0;
        var spdY = 0;
       
        if(Math.random()<0.5){
                var category = 'score';
                var color = 'orange';
        } else {
                var category = 'atkSpd';
                var color = 'purple';
        }
       
        Upgrade(id,x,y,spdX,spdY,width,height,category,color);
}
 
Bullet = function (id,x,y,spdX,spdY,width,height){
        var asd = {
                type:'bullet',
                x:x,
                spdX:spdX,
                y:y,
                spdY:spdY,
                name:'E',
                id:id,
                width:width,
                height:height,
                color:'black',
                //
                timer:0,
        };
        bulletList[id] = asd;
}
 
generateBullet = function(actor,aimOverwrite){
        //Math.random() returns a number between 0 and 1
        var x = player.x;
        var y = player.y;
        var height = 10;
        var width = 10;
        var id = Math.random();
       
        var angle;
        if(aimOverwrite !== undefined)
                angle = aimOverwrite;
        else angle = actor.aimAngle;
       
        var spdX = Math.cos(angle/180*Math.PI)*5;
        var spdY = Math.sin(angle/180*Math.PI)*5;
        Bullet(id,x,y,spdX,spdY,width,height);
}
 
updateEntity = function(entity){
        updateEntityPosition(entity);
        drawEntity(entity);
}
 
updateEntityPosition = function(entity){
        if(entity.type === 'player'){
                if(player.pressingRight)
                        player.x += 10;
                if(player.pressingLeft)
                        player.x -= 10;
                if(player.pressingDown)
                        player.y += 10;
                if(player.pressingUp)
                        player.y -= 10;
               
                //ispositionvalid
                if(player.x < player.width/2)
                        player.x = player.width/2;
                if(player.x > WIDTH-player.width/2)
                        player.x = WIDTH - player.width/2;
                if(player.y < player.height/2)
                        player.y = player.height/2;
                if(player.y > HEIGHT - player.height/2)
                        player.y = HEIGHT - player.height/2;
       
        } else {
                entity.x += entity.spdX;
                entity.y += entity.spdY;
                               
                if(entity.x < 0 || entity.x > WIDTH){
                        entity.spdX = -entity.spdX;
                }
                if(entity.y < 0 || entity.y > HEIGHT){
                        entity.spdY = -entity.spdY;
                }
        }
}
 
testCollisionRectRect = function(rect1,rect2){
        return rect1.x <= rect2.x+rect2.width
                && rect2.x <= rect1.x+rect1.width
                && rect1.y <= rect2.y + rect2.height
                && rect2.y <= rect1.y + rect1.height;
}
 
drawEntity = function(entity){
        ctx.save();
        ctx.fillStyle = entity.color;
        ctx.fillRect(entity.x-entity.width/2,entity.y-entity.height/2,entity.width,entity.height);
        ctx.restore();
}
 
document.onclick = function(mouse){
        performAttack(player);
}
 
performAttack = function(actor){
        if(actor.attackCounter > 25){   //every 1 sec
                actor.attackCounter = 0;
                generateBullet(actor);
        }
}
 
 
document.oncontextmenu = function(mouse){
        performSpecialAttack(player);
        mouse.preventDefault();
}
 
performSpecialAttack = function(actor){
        if(actor.attackCounter > 50){   //every 1 sec
                actor.attackCounter = 0;
                /*
                for(var i = 0 ; i < 360; i++){
                        generateBullet(actor,i);
                }
                */
                generateBullet(actor,actor.aimAngle - 5);
                generateBullet(actor,actor.aimAngle);
                generateBullet(actor,actor.aimAngle + 5);
        }
}
 
document.onmousemove = function(mouse){
        var mouseX = mouse.clientX - document.getElementById('ctx').getBoundingClientRect().left;
        var mouseY = mouse.clientY - document.getElementById('ctx').getBoundingClientRect().top;
       
        mouseX -= player.x;
        mouseY -= player.y;
       
        player.aimAngle = Math.atan2(mouseY,mouseX) / Math.PI * 180;
}
 
document.onkeydown = function(event){
        if(event.keyCode === 68)        //d
                player.pressingRight = true;
        else if(event.keyCode === 83)   //s
                player.pressingDown = true;
        else if(event.keyCode === 65) //a
                player.pressingLeft = true;
        else if(event.keyCode === 87) // w
                player.pressingUp = true;
}
 
document.onkeyup = function(event){
        if(event.keyCode === 68)        //d
                player.pressingRight = false;
        else if(event.keyCode === 83)   //s
                player.pressingDown = false;
        else if(event.keyCode === 65) //a
                player.pressingLeft = false;
        else if(event.keyCode === 87) // w
                player.pressingUp = false;
}
 
 
update = function(){
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        frameCount++;
        score++;
       
        if(frameCount % 100 === 0)      //every 4 sec
                randomlyGenerateEnemy();
 
        if(frameCount % 75 === 0)       //every 3 sec
                randomlyGenerateUpgrade();
       
        player.attackCounter += player.atkSpd;
       
       
        for(var key in bulletList){
                updateEntity(bulletList[key]);
               
                var toRemove = false;
                bulletList[key].timer++;
                if(bulletList[key].timer > 75){
                        toRemove = true;
                }
               
                for(var key2 in enemyList){
                        var isColliding = testCollisionEntity(bulletList[key],enemyList[key2]);
                        if(isColliding){
                                toRemove = true;
                                delete enemyList[key2];
                                break;
                        }                      
                }
                if(toRemove){
                        delete bulletList[key];
                }
        }
       
        for(var key in upgradeList){
                updateEntity(upgradeList[key]);
                var isColliding = testCollisionEntity(player,upgradeList[key]);
                if(isColliding){
                        if(upgradeList[key].category === 'score')
                                score += 1000;
                        if(upgradeList[key].category === 'atkSpd')
                                player.atkSpd += 3;
                        delete upgradeList[key];
                }
        }
       
        for(var key in enemyList){
                updateEntity(enemyList[key]);
               
                var isColliding = testCollisionEntity(player,enemyList[key]);
                if(isColliding){
                        player.hp = player.hp - 1;
                }
        }
        if(player.hp <= 0){
                var timeSurvived = Date.now() - timeWhenGameStarted;           
                console.log("You lost! You survived for " + timeSurvived + " ms.");            
                startNewGame();
        }
        updateEntity(player);
        ctx.fillText(player.hp + " Hp",0,30);
        ctx.fillText('Score: ' + score,200,30);
}
 
startNewGame = function(){
        player.hp = 10;
        timeWhenGameStarted = Date.now();
        frameCount = 0;
        score = 0;
        enemyList = {};
        upgradeList = {};
        bulletList = {};
        randomlyGenerateEnemy();
        randomlyGenerateEnemy();
        randomlyGenerateEnemy();
       
}
 
createPlayer();
startNewGame();
 
setInterval(update,40);
 
 
 
 
        