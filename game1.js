var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';
 
var HEIGHT = 500;
var WIDTH = 500;
var timeWhenGameStarted = Date.now();   //return time in ms
 
var player = {
        x:50,
        spdX:30,
        y:40,
        spdY:5,
        name:'P',
        hp:10, 
};
 
var enemyList = {};
 
 
getDistanceBetweenEntity = function (entity1,entity2){  //return distance (number)
        var vx = entity1.x - entity2.x;
        var vy = entity1.y - entity2.y;
        return Math.sqrt(vx*vx+vy*vy);
}
 
testCollisionEntity = function (entity1,entity2){       //return if colliding (true/false)
        var distance = getDistanceBetweenEntity(entity1,entity2);
        return distance < 30;
}
 
Enemy = function (id,x,y,spdX,spdY){
        var enemy3 = {
                x:x,
                spdX:spdX,
                y:y,
                spdY:spdY,
                name:'E',
                id:id,
        };
        enemyList[id] = enemy3;
       
}
 
document.onmousemove = function(mouse){
        var mouseX = mouse.clientX;
        var mouseY = mouse.clientY;
       
        player.x = mouseX;
        player.y = mouseY;
}
 
 
 
 
 
updateEntity = function (something){
        updateEntityPosition(something);
        drawEntity(something);
}
updateEntityPosition = function(something){
        something.x += something.spdX;
        something.y += something.spdY;
                       
        if(something.x < 0 || something.x > WIDTH){
                something.spdX = -something.spdX;
        }
        if(something.y < 0 || something.y > HEIGHT){
                something.spdY = -something.spdY;
        }
}
 
 
drawEntity = function(something){
        ctx.fillText(something.name,something.x,something.y);
}
 
 
 
update = function(){
        ctx.clearRect(0,0,WIDTH,HEIGHT);
       
        for(var key in enemyList){
                updateEntity(enemyList[key]);
               
                var isColliding = testCollisionEntity(player,enemyList[key]);
                if(isColliding){
                        player.hp = player.hp - 1;
                        if(player.hp <= 0){
                                var timeSurvived = Date.now() - timeWhenGameStarted;
                               
                                console.log("You lost! You survived for " + timeSurvived + " ms.");
                                timeWhenGameStarted = Date.now();
                                player.hp = 10;
                        }
                }
               
        }
       
        drawEntity(player);
        ctx.fillText(player.hp + " Hp",0,30);
}
 
Enemy('E1',150,350,10,15);
Enemy('E2',250,350,10,-15);
Enemy('E3',250,150,10,-8);
 
 
setInterval(update,40);
 
 
 
 
 
 
 