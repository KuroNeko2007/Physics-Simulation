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

new Entity(new Vector2(10, 10), new Vector2(0, 0), 2, 10).setThisAsCamera().color = new Color(255, 230, 200);

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