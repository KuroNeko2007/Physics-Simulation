{
    // View Different Spaces

    let canvasDiv = document.getElementById('canvasDiv');
    let settingsDiv = document.getElementById('settingsDiv');
    let entityDiv = document.getElementById('entityDiv');

    viewCanvas.addEventListener('click', () => {
        viewCanvas.hidden = true;
        viewSetting.hidden = false;
        viewEntities.hidden = false;

        canvasDiv.hidden = false;
        settingsDiv.hidden = true;
        entityDiv.hidden = true;
    });

    viewSetting.addEventListener('click', () => {
        viewCanvas.hidden = false;
        viewSetting.hidden = true;
        viewEntities.hidden = false;

        canvasDiv.hidden = true;
        settingsDiv.hidden = false;
        entityDiv.hidden = true;

        if (!paused) {
            startButton.click();
        }
    });

    viewEntities.addEventListener('click', () => {
        viewCanvas.hidden = false;
        viewSetting.hidden = false;
        viewEntities.hidden = true;

        canvasDiv.hidden = true;
        settingsDiv.hidden = true;
        entityDiv.hidden = false;

        if (!paused) {
            startButton.click();
        }
        if (entitySelector.options.length > 0) {
            showEntitySelector();
        }
    });

    zoomIn.addEventListener('click', function() {
        ctx.scale(11 / 10, 11 / 10);
    });

    zoomOut.addEventListener('click', function() {
        ctx.scale(10 / 11, 10 / 11);
    });

    largeZoomIn.addEventListener('click', function() {
        ctx.scale(5 / 2, 5 / 2);
    });

    largeZoomOut.addEventListener('click', function() {
        ctx.scale(2 / 5, 2 / 5);
    });

    startButton.addEventListener('click', function() {
        if (paused) {
            startButton.value = 'Stop';
        } else {
            startButton.value = 'Start';
        }

        paused = !paused;
    });

    simSpeed.addEventListener('change', function() {
        if (!isNaN(parseFloat(simSpeed.value))) {
            Entity.simulationSpeed = parseFloat(simSpeed.value);
        }
    });

    gravConst.addEventListener('change', function() {
        if (!isNaN(parseFloat(gravConst.value))) {
            Entity.gravConst = parseFloat(gravConst.value);
        }
    });

    collType.addEventListener('change', function() {
        if (collType.value === "merge") {
            Entity.collType = "merge";
        } else {
            Entity.collType = "bounce";
        }
    })
}