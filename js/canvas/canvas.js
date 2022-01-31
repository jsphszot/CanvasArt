// // GRID // //

// // record canvas: https://medium.com/@amatewasu/how-to-record-a-canvas-element-d4d0826d3591

// Setup ---------------------------------------------------

var canvas = document.getElementById("canvas01");
var context = canvas.getContext("2d");

// DrawingFunctions ----------------------------------------

function draw_grid(cols, rows, canvasW, canvasH) {
    
    const numCells = cols*rows;
    const gridW = canvasW*0.8;
    const gridH = canvasH*0.8;
    const cellW = gridW/cols;
    const cellH = gridH/rows;
    const margeX = (canvasW-gridW)/2;
    const margeY = (canvasH-gridH)/2;

    for (let i=0; i<numCells; i++) {
        const col = i % cols; // modulated between 0 and cols-1
        const row = Math.floor(i/cols); // from 0 to i/cols, +1 each +cols steps 

        const x = col*cellW;
        const y = row*cellH;
        const w = cellW*0.8;
        const h = cellH*0.8;

        context.save();
        context.translate(x,y); 
        // can also just add following values to x and y directly, same end result.
        context.translate(margeX,margeY); // consider margins
        context.translate(cellW/2,cellH/2); // consider draw starts from middle of object

        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(w*-0.5, 0);
        context.lineTo(w*0.5, 0);
        context.stroke();

        context.restore();

    }
}

// Run all functions inside --------------------------------
function SetCanvas(){

    const pageBody = document.body;
    var windW = pageBody.clientWidth;
    // var windH = pageBody.clientHeight;
    var windH = window.innerHeight;
    var canvasW = windW; 
    var canvasH = windH*0.95;


    // reset canvas width
    context.canvas.width = canvasW;
    context.canvas.height = canvasH;
    
    draw_grid(50, 50, canvasW, canvasH);

    
}


// RunTime -------------------------------------------------





SetCanvas();
// window.requestAnimationFrame();
window.addEventListener('resize', SetCanvas);