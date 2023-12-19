const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');


const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 20,
  speed: 5,
  direction: 0, // 0: right, 1: down, 2: left, 3: up
};


const circles = [];
const bullets = [];
const bulletSpeed = 7;


// Generate random number between min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


// Create random circle
function createCircle() {
  const circle = {
    x: getRandomNumber(20, canvas.width - 20),
    y: getRandomNumber(20, canvas.height - 20),
    radius: 20,
    dx: getRandomNumber(-3, 3),
    dy: getRandomNumber(-3, 3),
  };
  circles.push(circle);
}


// Draw player on the canvas
function drawPlayer() {
  ctx.fillStyle = '#3498db';
  ctx.fillRect(player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);
}


// Draw circles on the canvas
function drawCircles() {
  circles.forEach(circle => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#e74c3c';
    ctx.fill();
    ctx.closePath();
  });
}


// Draw bullets on the canvas
function drawBullets() {
  bullets.forEach(bullet => {
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(bullet.x, bullet.y, 5, 5);
  });
}


// Update player position
function updatePlayerPosition() {
  switch (player.direction) {
    case 0: // right
      player.x += player.speed;
      break;
    case 1: // down
      player.y += player.speed;
      break;
    case 2: // left
      player.x -= player.speed;
      break;
    case 3: // up
      player.y -= player.speed;
      break;
  }
}


// Update circle positions and handle collisions
function updateCircles() {
  circles.forEach(circle => {
    circle.x += circle.dx;
    circle.y += circle.dy;


    // Bounce off the walls
    if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
      circle.dx = -circle.dx;
    }


    if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
      circle.dy = -circle.dy;
    }
  });
}


// Update bullet positions and handle collisions
function updateBullets() {
  bullets.forEach((bullet, bulletIndex) => {
    switch (bullet.direction) {
      case 0: // right
        bullet.x += bulletSpeed;
        break;
      case 1: // down
        bullet.y += bulletSpeed;
        break;
      case 2: // left
        bullet.x -= bulletSpeed;
        break;
      case 3: // up
        bullet.y -= bulletSpeed;
        break;
    }


    // Remove bullets that go off the canvas
    if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
      bullets.splice(bulletIndex, 1);
    }


    // Check for collisions with circles
    circles.forEach((circle, circleIndex) => {
      const distance = Math.sqrt((bullet.x - circle.x) ** 2 + (bullet.y - circle.y) ** 2);


      if (distance < circle.radius + 5) {
        bullets.splice(bulletIndex, 1);
        circles.splice(circleIndex, 1);
      }
    });
  });
}


// Handle mouse down events
function handleMouseDown(event) {
  const bullet = {
    x: player.x,
    y: player.y,
    direction: player.direction,
  };
  bullets.push(bullet);
}


// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  updatePlayerPosition();
  drawPlayer();


  drawCircles();
  updateCircles();


  drawBullets();
  updateBullets();


  requestAnimationFrame(gameLoop);
}


// Initialize the game
function init() {
  for (let i = 0; i < 5; i++) {
    createCircle();
  }


  canvas.addEventListener('mousedown', handleMouseDown);


  // Handle key events for player movement
  document.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'ArrowRight':
        player.direction = 0;
        break;
      case 'ArrowDown':
        player.direction = 1;
        break;
      case 'ArrowLeft':
        player.direction = 2;
        break;
      case 'ArrowUp':
        player.direction = 3;
        break;
    }
  });


  gameLoop();
}


// Run the game
init();


// Handle mouse down events
function handleMouseDown(event) {
  const bullet = {
    x: player.x,
    y: player.y,
    direction: player.direction,
  };
  bullets.push(bullet);
}


canvas.addEventListener('mousedown', handleMouseDown);
