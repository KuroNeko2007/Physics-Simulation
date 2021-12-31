class Entity {

    /** @type {Entity[]} */
    static entityList = [];

    /** @type {x:number, y:number} */
    static camera = { x: 0, y: 0 };
    static entityCount = 0;
    static gravConst = isNaN(parseFloat(gravConst.value)) ? 1 : parseFloat(gravConst.value);
    static simulationSpeed = isNaN(parseFloat(simSpeed.value)) ? 1 : parseFloat(simSpeed.value);

    /** @type {"bounce" | "merge"} */
    static collType = collType.value === "merge" ? "merge" : "bounce";

    static drawAll() {
        for (var i = 0; i < Entity.entityList.length; i++) {
            Entity.entityList[i].draw();
        }
    }

    static updateAll(time) {
        for (var i = 0; i < Entity.entityList.length; i++) {
            Entity.entityList[i].update(time);
        }
    }

    /**
     * Looks for an entity with the specified id and returns it if found.
     * Returns null if not found.
     * @param {string} id 
     * @returns {Entity | null}
     */
    static lookForEntity(id) {
        for (let i = 0; i < Entity.entityList.length; i++) {
            if (id === Entity.entityList[i].id) {
                return Entity.entityList[i];
            }
        }

        return null;
    }

    /**
     * @constructor
     * @param {Vector2} position
     * @param {Vector2} velocity
     * @param {number} mass
     * @param {number} radius
     */

    constructor(position, velocity, mass, radius) {

        /** @type {string} */
        this.id = crypto.randomUUID();
        this.name = `Entity-${Entity.entityCount}`;

        Entity.entityList.push(this);
        Entity.entityCount++;

        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this.radius = radius;

        this.isCamera = false;

        this.color = new Color(255, 255, 255);
    }

    setThisAsCamera() {
        Entity.camera = this;
        this.isCamera = true;
        return this;
    }

    draw() {
        ctx.save();

        ctx.fillStyle = this.color.toString();
        ctx.strokeStyle = this.color.changeLightnessByPercentage(-20);
        ctx.lineWidth = this.radius / 10;

        ctx.beginPath();
        ctx.arc(this.x - Entity.camera.x, this.y - Entity.camera.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    }

    update(time) {
        time *= Entity.simulationSpeed;

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        let netForce = new Vector2(0, 0);
        for (let i = 0; i < Entity.entityList.length; i++) {
            if (Entity.entityList[i].id === this.id) {
                continue;
            }

            if (this.isCollindingWith(Entity.entityList[i], true)) {
                if (Entity.collType === "merge") {
                    return;
                }
            }

            let forceApplied = this.getGravitationalForceBetween(Entity.entityList[i]);

            netForce.x += forceApplied.x;
            netForce.y += forceApplied.y;
        }

        let deltaV = new Vector2(netForce.x * time / this.mass, netForce.y * time / this.mass);


        this.velocity.x += deltaV.x;
        this.velocity.y += deltaV.y;
    }

    isCollindingWith(anotherEntity, shouldHandle) {
        if (this.getDistanceFrom(anotherEntity) > this.radius + anotherEntity.radius) {
            return false;
        }

        //console.log(`${this.getDistanceFrom(anotherEntity)} is the distance. ${this.radius + anotherEntity.radius} is the sum of radius`);

        if (shouldHandle) {
            this.handleCollision(anotherEntity);
        }

        return true;
    }

    handleCollision(anotherEntity) {
        if (Entity.collType === "merge") {
            this.handleMerge(anotherEntity);
        } else if (Entity.collType === "bounce") {
            this.handleBounce(anotherEntity);
        } else {
            alert("Error: Collision Type not recognized");
        }
    }

    /**
     * @param {Entity} anotherEntity
     */
    handleBounce(anotherEntity) {
        let newThisVelX = this.velocity.x * (this.mass - anotherEntity.mass) / (this.mass + anotherEntity.mass);
        newThisVelX += 2 * anotherEntity.velocity.x * anotherEntity.mass / (this.mass + anotherEntity.mass);

        let newThisVelY = this.velocity.y * (this.mass - anotherEntity.mass) / (this.mass + anotherEntity.mass);
        newThisVelY += 2 * anotherEntity.velocity.y * anotherEntity.mass / (this.mass + anotherEntity.mass);

        let newAnotherVelX = anotherEntity.velocity.x * (anotherEntity.mass - this.mass) / (this.mass + anotherEntity.mass);
        newAnotherVelX += 2 * this.velocity.x * this.mass / (this.mass + anotherEntity.mass);

        let newAnotherVelY = anotherEntity.velocity.y * (anotherEntity.mass - this.mass) / (this.mass + anotherEntity.mass);
        newAnotherVelY += 2 * this.velocity.y * this.mass / (this.mass + anotherEntity.mass);

        this.velocity = new Vector2(newThisVelX, newThisVelY);
        anotherEntity.velocity = new Vector2(newAnotherVelX, newAnotherVelY);
    }

    /**
     * @param {Entity} anotherEntity
     */
    handleMerge(anotherEntity) {
        this.remove();
        anotherEntity.remove();

        let posX = (this.x * this.mass * this.radius) + (anotherEntity.x * anotherEntity.mass * anotherEntity.radius);
        posX /= (this.mass * this.radius) + (anotherEntity.mass * anotherEntity.radius);

        let posY = (this.y * this.mass * this.radius) + (anotherEntity.y * anotherEntity.mass * anotherEntity.radius);
        posY /= (this.mass * this.radius) + (anotherEntity.mass * anotherEntity.radius);

        let pos = new Vector2(posX, posY);

        let velX = (this.velocity.x * this.mass) + (anotherEntity.velocity.x * anotherEntity.mass);
        velX /= this.mass + anotherEntity.mass;

        let velY = (this.velocity.y * this.mass) + (anotherEntity.velocity.y * anotherEntity.mass);
        velY /= this.mass + anotherEntity.mass;

        let vel = new Vector2(velX, velY);

        let mass = this.mass + anotherEntity.mass;
        let radius = Math.sqrt(Math.pow(this.radius, 2) + Math.pow(anotherEntity.radius, 2));

        let colorR = (this.color.red * this.mass * this.radius) + (anotherEntity.color.red * anotherEntity.mass * anotherEntity.radius);
        colorR /= (this.mass * this.radius) + (anotherEntity.mass * anotherEntity.radius);

        let colorG = (this.color.green * this.mass * this.radius) + (anotherEntity.color.green * anotherEntity.mass * anotherEntity.radius);
        colorG /= (this.mass * this.radius) + (anotherEntity.mass * anotherEntity.radius);

        let colorB = (this.color.blue * this.mass * this.radius) + (anotherEntity.color.blue * anotherEntity.mass * anotherEntity.radius);
        colorB /= (this.mass * this.radius) + (anotherEntity.mass * anotherEntity.radius);

        let nEntity = new Entity(pos, vel, mass, radius);
        nEntity.color = new Color(colorR, colorG, colorB);
        if (this.isCamera || anotherEntity.isCamera) {
            nEntity.setThisAsCamera();
        }

    }

    getDistanceSquareFrom(anotherEntity) {
        let dx = Math.pow(this.x - anotherEntity.x, 2);
        let dy = Math.pow(this.y - anotherEntity.y, 2);

        //console.log(`${dx + dy} is the distance`)

        return dx + dy;
    }

    getDistanceFrom(anotherEntity) {
        return Math.sqrt(this.getDistanceSquareFrom(anotherEntity));
    }

    getGravitationalForceBetween(anotherEntity) {
        let forceMag = Entity.gravConst * this.mass * anotherEntity.mass / this.getDistanceSquareFrom(anotherEntity);
        let forceDir = Math.atan2((anotherEntity.y - this.y), (anotherEntity.x - this.x));

        let forceX = forceMag * Math.cos(forceDir);
        let forceY = forceMag * Math.sin(forceDir);

        return new Vector2(forceX, forceY);
    }

    remove() {
        Entity.entityList.splice(Entity.entityList.indexOf(this), 1);
        EntityHandler.handleRemove(this.id);
    }

    get x() {
        return this.position.x;
    }

    set x(value) {
        this.position.x = value;
    }

    get y() {
        return this.position.y;
    }

    set y(value) {
        this.position.y = value;
    }

}