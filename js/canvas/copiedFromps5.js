
// Setup ---------------------------------------------------

import {degToRad, ranRange,} from "./utility_functions.js"

var canvas = document.getElementById("canvas01");
var context = canvas.getContext("2d");

// function setup() {
//     createCanvas(400,400);
// }

function draw() {
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    console.log("Hello")
    ellipse(mouseX, mouseY, 80, 80);
}