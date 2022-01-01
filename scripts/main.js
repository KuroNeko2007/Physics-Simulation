/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let paused = true;

canvas.width = 800;
canvas.height = 450;

ctx.translate(400, 225);
ctx.scale(40, -40);

/*(function tests() {
    console.error('This should not be visible in the main build.');

    let a = new Entity(new Vector2(2, 4), new Vector2(-0.1, -0.2), 1, 1);
    a.color = new Color(255, 200, 255);
})();*/

let timeLastFrame = performance.now();

function mainLoop() {
    let timeSinceLastFrame = performance.now() - timeLastFrame;
    timeLastFrame += timeSinceLastFrame;

    ctx.save();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.restore();

    Entity.drawAll();

    if (!paused) {
        Entity.updateAll(timeSinceLastFrame / 1000);
    }

    window.requestAnimationFrame(mainLoop);
}

window.requestAnimationFrame(mainLoop);