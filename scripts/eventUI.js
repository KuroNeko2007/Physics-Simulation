/** @type {HTMLDivElement} */
let entityDiv = document.getElementById('entityDiv');

/** @type {HTMLInputElement} */
let makeButton = document.getElementById('makeButton');

/** @type {HTMLSelectElement} */
let entitySelector = document.getElementById('entitySelector');
entitySelector.disabled = true;

/** @type {HTMLDivElement} */
let entityViewer = document.getElementById('entityViewer');
let ev = {
    entityName: document.getElementById('entityName'),

    entityX: document.getElementById('entityX'),
    entityY: document.getElementById('entityY'),

    entityVelocityX: document.getElementById('entityVelocityX'),
    entityVelocityY: document.getElementById('entityVelocityY'),

    entityMass: document.getElementById('entityMass'),

    entityRadius: document.getElementById('entityRadius'),

    entityColor: document.getElementById('entityColor'),

    entityUpdate: document.getElementById('entityUpdate'),
    entityDelete: document.getElementById('entityDelete')
}

let EntityHandler = {};
EntityHandler.handleRemove = (id) => {

};

const showEntitySelector = () => {
    let entity = Entity.lookForEntity(entitySelector.value);
    entityViewer.hidden = false;


};

makeButton.addEventListener('click', function() {
    let a = new Entity(new Vector2(0, 0), new Vector2(0, 0), 0, 0);

    let option = document.createElement('option');
    option.value = a.id;
    option.text = a.name;
    option.id = a.id;

    entitySelector.add(option);

    if (entitySelector.disabled) {
        entitySelector.disabled = false;
        showEntitySelector();
    }
});

entitySelector.addEventListener('change', showEntitySelector);