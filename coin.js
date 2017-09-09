//https://coderwall.com/p/iygcpa/gameloop-the-correct-way
//http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

var ctx = document.getElementById("coinAnimation").getContext("2d");
ctx.width = 100;
ctx.height = 100;

var coinImage = new Image();
coinImage.src = "images/coinsprite.png";

var coin = new sprite({
    context: ctx,
    width: 44,
    height: 44,
    image: coinImage
});

function sprite (options) {

    var that = {};
      that.context = options.context;
      that.width = options.width;
      that.height = options.height;
      that.image = options.image;
      frameIndex = 0;
      tickCount = 0;
      ticksPerFrame = options.ticksPerFrame || 0;
      numberOfFrames = options.numberOfFrames || 1;

    that.render = function () {
      ctx.clearRect(0, 0, that.width, that.height);



            // Draw the animation
            that.context.drawImage(
               that.image,
               frameIndex * that.width / numberOfFrames,
               0,
               that.width / numberOfFrames,
               that.height,
               0,
               0,
               that.width / numberOfFrames,
               that.height);
        };

      that.loop = options.loop;

      that.update = function () {
        tickCount += 1;
        if (tickCount > ticksPerFrame) {
        	tickCount = 0;
          // If the current frame index is in range
          if (frameIndex < numberOfFrames - 1) {
            // Go to the next frame
            frameIndex += 1;
          } else if (that.loop) {
            frameIndex = 0;
        }

        }
      };
    return that;
};


function gameLoop () {

  window.requestAnimationFrame(gameLoop);

  coin.update();
  coin.render();
}

// Start the game loop as soon as the sprite sheet is loaded
coinImage.addEventListener("load", gameLoop);
