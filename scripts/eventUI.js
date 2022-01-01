/** @type {HTMLDivElement} */
let entityDiv = document.getElementById('entityDiv');

/** @type {HTMLInputElement} */
let makeButton = document.getElementById('makeButton');

/** @type {HTMLSelectElement} */
let entitySelector = document.getElementById('entitySelector');
entitySelector.disabled = true;

/** @type {HTMLDivElement} */
let entityViewer = document.getElementById('entityViewer');
entityViewer.hidden = true;

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
    entityDelete: document.getElementById('entityDelete'),

    entityConfirmDelete: document.getElementById('entityConfirmDelete'),
    entityDeleteCancel: document.getElementById('entityDeleteCancel')
}



let EntityHandler = {};
EntityHandler.handleRemove = (id) => {
    let element = document.getElementById(id);

    try {

        element.remove();
        if (entitySelector.options.length === 0) {
            entitySelector.disabled = true;
            entityViewer.hidden = true;
            console.log(entityViewer.hidden);
        } else {
            showEntitySelector();
        }

    } catch (error) {
        console.error(error);
    }
};

const updateEntity = () => {
    let entity = Entity.lookForEntity(entitySelector.value);

    let option = entitySelector.selectedOptions[0];

    option.text = entity.name = ev.entityName.value;

    entity.x = ev.entityX.valueAsNumber;
    entity.y = ev.entityY.valueAsNumber;

    entity.velocity.x = ev.entityVelocityX.valueAsNumber;
    entity.velocity.y = ev.entityVelocityY.valueAsNumber;

    entity.mass = ev.entityMass.valueAsNumber;

    entity.radius = ev.entityRadius.valueAsNumber;

    entity.color = Color.makeColorFromHex(ev.entityColor.value);
}

const deleteEntity = () => {
    ev.entityDeleteCancel.click();

    try {
        Entity.lookForEntity(entitySelector.value).remove();
    } catch (error) {
        console.error(error);
    }
};

const showEntitySelector = () => {
    let entity = Entity.lookForEntity(entitySelector.value);
    console.log(entity);
    console.log(entitySelector.value);
    entityViewer.hidden = false;

    ev.entityName.value = entity.name;

    let precision = 100;

    ev.entityX.value = Math.round(entity.position.x * precision) / precision;
    ev.entityY.value = Math.round(entity.position.y * precision) / precision;

    ev.entityVelocityX.value = Math.round(entity.velocity.x * precision) / precision;
    ev.entityVelocityY.value = Math.round(entity.velocity.y * precision) / precision;

    ev.entityMass.value = Math.round(entity.mass * precision) / precision;;
    ev.entityRadius.value = Math.round(entity.radius * precision) / precision;;

    ev.entityColor.value = entity.color.toHex();
};

makeButton.addEventListener('click', function() {
    let a = new Entity(new Vector2(0, 0), new Vector2(0, 0), 0, 0);
    showEntitySelector();
});

(function setEntityEventListeners() {

    entitySelector.addEventListener('change', showEntitySelector);

    ev.entityUpdate.addEventListener('click', updateEntity);

    ev.entityDeleteCancel.addEventListener('click', () => {
        document.getElementById('entityDeleteConfirmButtons').hidden = true;
        ev.entityDelete.hidden = false;
    });

    ev.entityDelete.addEventListener('click', () => {
        document.getElementById('entityDeleteConfirmButtons').hidden = false;
        ev.entityDelete.hidden = true;
    });

    ev.entityConfirmDelete.addEventListener('click', deleteEntity);


    ev.entityColor.addEventListener('change', () => {
        if (!Color.isValidHex(ev.entityColor.value)) {
            ev.entityColor.value = '#ffffff';
        }
    });

    ev.entityName.addEventListener('change', () => {
        if (ev.entityName === "") {
            ev.entityVelocityX.value = Entity.lookForEntity(entitySelector.value).name;
        }
    });

    ev.entityX.addEventListener('change', () => {
        if (isNaN(ev.entityX.valueAsNumber)) {
            ev.entityX.value = 0;
        }
    });

    ev.entityY.addEventListener('change', () => {
        if (isNaN(ev.entityY.valueAsNumber)) {
            ev.entityY.value = 0;
        }
    });

    ev.entityVelocityX.addEventListener('change', () => {
        if (isNaN(ev.entityVelocityX.valueAsNumber)) {
            ev.entityVelocityX.value = 0;
        }
    });

    ev.entityVelocityY.addEventListener('change', () => {
        if (isNaN(ev.entityVelocityY.valueAsNumber)) {
            ev.entityVelocityY.value = 0;
        }
    });

    ev.entityMass.addEventListener('change', () => {
        if (isNaN(ev.entityMass.valueAsNumber) || ev.entityMass.valueAsNumber < 0) {
            ev.entityMass.value = 0;
        }
    });

    ev.entityRadius.addEventListener('change', () => {
        if (isNaN(ev.entityRadius.valueAsNumber) || ev.entityRadius.valueAsNumber < 0) {
            ev.entityRadius.value = 0;
        }
    });

})();