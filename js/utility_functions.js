function degToRad(degrees) {
    return degrees /180 * Math.PI;
};
function ranRange(max, min) {
    return Math.random()*(max - min) + min;
};

export {degToRad, ranRange};
