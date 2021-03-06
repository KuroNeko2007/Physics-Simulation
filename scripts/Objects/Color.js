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

    static getValue(value) {
        return Math.max(Math.min(value, 255), 0);
    }

    /**
     * Converts the number to base-16
     * @param {number} value 
     * @returns string
     */
    static getHex(value) {
        value = Color.getValue(value);
        return value > 16 ? value.toString(16) : `0${value.toString(16)}`;
    }

    static regHex = /^#[0-9A-F]{6}$/i;

    /**
     * @param {string} string 
     * @returns boolean
     */
    static isValidHex(string) {
        return this.regHex.test(string);
    }

    static makeColorFromHex(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? new Color(
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ) : new Color(255, 255, 255);
    }

    toString() {
        return `rgb(${Color.getValue(this.red)}, ${Color.getValue(this.green)}, ${Color.getValue(this.blue)})`;
    }

    toHex() {
        return `#${Color.getHex(this.red)}${Color.getHex(this.green)}${Color.getHex(this.blue)}`;
    }
}