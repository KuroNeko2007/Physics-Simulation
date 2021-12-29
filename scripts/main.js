/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let timeLastFrame = performance.now();

function mainLoop() {
    let timeSinceLastFrame = performance.now() - timeLastFrame;
    timeLastFrame += timeSinceLastFrame;



    window.requestAnimationFrame(mainLoop);
}

window.requestAnimationFrame(mainLoop);