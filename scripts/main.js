/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let paused = true;
let simulationSpeed = 10;

canvas.width = 800;
canvas.height = 450;

ctx.translate(400, 225);
ctx.scale(20, -20);

let timeLastFrame = performance.now();

let a = new Entity(new Vector2(0, 0), new Vector2(0.25, 0.1), 2, 10);
a.color = new Color(200, 255, 255);

function mainLoop() {
    let timeSinceLastFrame = performance.now() - timeLastFrame;
    timeLastFrame += timeSinceLastFrame;
	
	ctx.clearRect(-canvas.width, -canvas.height, 2 * canvas.width, 2 * canvas.height);
	
	Entity.drawAll();
	
	if(!paused) {
		Entity.updateAll(simulationSpeed * timeSinceLastFrame / 1000);
	}

    window.requestAnimationFrame(mainLoop);
}

window.requestAnimationFrame(mainLoop);