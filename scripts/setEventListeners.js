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
}