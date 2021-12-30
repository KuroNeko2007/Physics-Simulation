class Color {
    constructor(r = 0, g = 0, b = 0) {
        this.red = r;
        this.green = g;
        this.blue = b;
    }

    /**
     * @param {number} percent
     * @returns {Color}
     */
    changeLightnessByPercentage(percent) {
        if (percent > 100 || percent < -100 || typeof percent !== "number") {
            throw 'Unexpected value of percent in function changeLightnessByPercentage. \n Was expecting value between -100 to 100, Got ' + percent;
        }

        let change = percent * 255 / 100;

        return new Color(this.red + change, this.green + change, this.blue + change);
    }

    toString() {
        return `rgb(${Math.max(Math.min(this.red, 255), 0)}, ${Math.max(Math.min(this.green, 255), 0)}, ${Math.max(Math.min(this.blue, 255), 0)})`;
    }
}