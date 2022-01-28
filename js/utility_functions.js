function degToRad(degrees) {
    return degrees /180 * Math.PI;
};
function ranRange(max, min) {
    return Math.random()*(max - min) + min;
};
function ToF() {
    if (ranRange(1,0) > 0.5) {
        return true;
    } else {
        return false;
    }
};


export {degToRad, ranRange, ToF};
