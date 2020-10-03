window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  setInterval(game, 1000 / 15);
  document.addEventListener("keydown", controls);
};

function updateSnakeLength(length) {
  snakeLength = length;
  score = snakeLength - 1 > 0 ? snakeLength - 1 : 0;
  document.getElementById("score").innerHTML = score;
}

function controls(evt) {
  switch (evt.keyCode) {
    case 37:
      if (currentDirection != 39) {
        currentDirection = 37;
        xVelocity = -1;
        yVelocity = 0;
      }
      break;
    case 38:
      if (currentDirection != 40) {
        currentDirection = 38;
        xVelocity = 0;
        yVelocity = -1;
      }
      break;
    case 39:
      if (currentDirection != 37) {
        currentDirection = 39;
        xVelocity = 1;
        yVelocity = 0;
      }
      break;
    case 40:
      if (currentDirection != 38) {
        currentDirection = 40;
        xVelocity = 0;
        yVelocity = 1;
      }
      break;
  }
}

length = 500;
cellSize = 10;
cells = length / cellSize;
xVelocity = 0;
yVelocity = 0;
currentDirection = undefined;
xPosition = yPosition = Math.floor(cells / 2);
trail = [];
snakeLength = 1;
aX = aY = 10;
score = document.getElementById("score");

function game() {
  xPosition += xVelocity;
  yPosition += yVelocity;
  if (xPosition >= cells) xPosition = 0;
  if (xPosition < 0) xPosition = cells - 1;
  if (yPosition >= cells) yPosition = 0;
  if (yPosition < 0) yPosition = cells - 1;

  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, 500, 500);
  ctx.fillStyle = "lime";
  for ({ x, y } of trail) {
    ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
    if (xPosition == x && yPosition == y) {
      updateSnakeLength(1);
    }
  }

  trail.push({ x: xPosition, y: yPosition });

  ctx.fillStyle = "red";
  ctx.fillRect(aX * cellSize, aY * cellSize, cellSize, cellSize);

  if (xPosition == aX && yPosition == aY) {
    updateSnakeLength(snakeLength + 1);
    aX = Math.floor(Math.random() * cells);
    aY = Math.floor(Math.random() * cells);
  }

  while (trail.length > snakeLength) {
    trail.shift();
  }
}
