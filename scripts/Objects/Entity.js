class Entity {
	
	/** @type {Entity[]} */
    static entityList = [];
	static camera = {x: 0, y: 0};
	static entityCount = 0;
	
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
	 * @constructor
	 * @param {Vector2} position
	 * @param {Vector2} velocity
	 * @param {number} mass
	 * @param {number} radius
	 */
	
    constructor(position, velocity, mass, radius) {
        Entity.entityList.push(this);
		Entity.entityCount++;
		
		/** @type {string} */
        this.id = crypto.randomUUID();
        

        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this.radius = radius;
        
        this.color = new Color(0, 0, 0);
    }
    
    setThisAsCamera() {
    	Entity.camera = this;
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
    	console.log('Update not yet made...');
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