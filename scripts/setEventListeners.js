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
    });

    viewEntities.addEventListener('click', () => {
        viewCanvas.hidden = false;
        viewSetting.hidden = false;
        viewEntities.hidden = true;

        canvasDiv.hidden = true;
        settingsDiv.hidden = true;
        entityDiv.hidden = false;
    });
    
    zoomIn.addEventListener('click', function(){
    	ctx.scale(11 / 10, 11 / 10);
    });
    
    zoomOut.addEventListener('click', function() {
    	ctx.scale(10 / 11, 10 / 11);
    });
    
    startButton.addEventListener('click', function() {
    	if(paused) {
    		startButton.value = 'Stop';
    	}else {
    		startButton.value = 'Start';
    	}
    	
    	paused = !paused;
    });
    
    simSpeed.addEventListener('change', function() {
    	if(!isNaN(parseFloat(simSpeed.value))){
    		simulationSpeed = parseFloat(simSpeed.value);
    	}
    })
}