// make a conways life
// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
// coding challenge: https://www.youtube.com/watch?v=FWSR_7kZuYg
// epic conway: https://www.youtube.com/watch?v=C2vgICfQawE
import {ranRange, ToF} from "../utility_functions.js"

var canvas = document.getElementById('canvas01');
var context = canvas.getContext('2d');

// // // get window dims, includes vertical scroll
var windW = document.documentElement.clientWidth;
var windH = document.documentElement.clientHeight;

var gridDims = [windW/100, windH/100];



function draw(context) {
    var w = context.canvas.width;
    var h = context.canvas.height;
    console.log(`w ${w}, h ${h}`)
 
    var nRow = 100 || 20;
    var nCol = 100 || 20;

    var grid = [];

    for (let i=0; i<nRow*nCol; i++) {
        grid.push(ToF())
    }

    w /= nCol; 
    h /= nRow;

    for (let i = 0; i < nRow; i++) {
        for (let j = 0; j < nCol; j++){
            // x,y coordinate of rect start point
            // width, height 
            // context.rect(2*j*w + (i%2 ? 0 : w), i*h, w, h);
            var buffer = 1;
            if (grid[i*j]){
                context.rect((i-buffer)*w,(j-buffer)*h,w,h);
            }
        }
    }
    context.fill()
}



function SetCanvas() {
    // used at page load and resize
    var CanvPercPage = 1;

    // // // get window dims, includes vertical scroll
    var windW = document.documentElement.clientWidth;
    var windH = document.documentElement.clientHeight;

    // get navbar height to include in canvas H calc
    var navH = document.getElementById("navbar").clientHeight;
    
    // set page dims
    window.canvasW = windW*CanvPercPage;
    window.canvasH = windH*CanvPercPage-navH;
    
    // reset canvas width 
    context.canvas.width = canvasW;
    context.canvas.height = canvasH;

    // window.floating_agents = AgentPopulator(canvasW, canvasH, Npoints, MaxRadius);
    // console.log(`wW: ${windW}, wH: ${windH} ::: Npoints ${Npoints}, MaxR ${MaxRadius}`)
}

SetCanvas();
draw(context);