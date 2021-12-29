class Entity {

    static entityList = [];

    constructor(position, velocity, mass, radius) {
        this.entityList.push(this);

        this.id = crypto.randomUUID();

        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this.radius = radius;
    }
}