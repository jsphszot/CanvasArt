// Setup ---------------------------------------------------

import {degToRad, ranRange,} from "../../utility_functions.js"

var canvas = document.getElementById("canvas01");
var context = canvas.getContext("2d");

// Functions -----------------------------------------------

function draw_rectsOnCirc(canvasW, canvasH) {

    var shapeW = canvasW*0.6;
    var shapeH = canvasH*0.6;

    context.fillStyle = 'black';
    const x = shapeW/2; 
    const y = shapeH/2; 
    // re center from upper left to new x,y 
    context.translate(canvasW/2, canvasH/2);
    
    var num = 12;
    var cX = shapeW/5;
    // cY = -shapeH/15;
    for (let i = 0; i < num; i++){

        const w = ranRange(0.35, 0)*shapeW;
        const h = ranRange(0.08, 0)*shapeH;

        context.save();
        context.rotate(degToRad(360/num*i)); // radians
        // context.scale(1,1)
        
        context.beginPath();
        // x,y, width,height
        // context.rect(-w/2, -h/2, w, h); // draw centered
        context.rect(cX, -h/2, w, h);
        context.fill();
        context.restore();
    }

    // reset to original center
    context.translate(-canvasW/2, -canvasH/2);
        
};

function draw_Arcs(canvasW, canvasH, looops) {
    
    var shapeW = canvasW*0.6;
    var shapeH = canvasH*0.6;
    context.fillStyle = 'black';
    const x = shapeW/2; 
    const y = shapeH/2;
    // re center from upper left to new x,y 
    context.translate(canvasW/2, canvasH/2);

    var num = 12*looops;
    var cX = shapeW/5;
    // cY = -shapeH/15;
    for (let i = 0; i < num; i++){

        const w = ranRange(0.35, 0)*shapeW;
        const h = ranRange(0.08, 0)*shapeH;

        context.save();
        context.rotate(degToRad(360/num*i)); // radians
        // context.scale(1,1)
        
        context.lineWidth = ranRange(15, 5);
        context.beginPath();
        // context.arc(cX, -h/2, w, h);
        // x, y, radius, startAngle, endAngle, [counterclockwise]
        context.arc(
            0,0, // x, y
            (cX+shapeW*0.4)*ranRange(1.3,0.6), // radius
            ranRange(0.1, -0.5),  // startAngle
            ranRange(1, 0.1) // endAngle
            );
        context.stroke();
        context.restore();
    }

    context.translate(-canvasW/2, -canvasH/2);
    
};

function AgentPopulator(maxW, maxH, NofAgents){
    // // Function returns 
    // maxW: max x origin position of agent.
    // maxH: max Y origin position of agent (consider how in canvas H++ downwards).
    // NofAgents: how many agents to create.
    const agents = [];
    for (let i=0; i<NofAgents; i++){   
        var aX = ranRange(maxW, 0);
        var aY = ranRange(maxH, 0);
        agents.push(
            // x, y, maxW, maxH, V
            new Agent(
                aX, aY,
                ranRange(50,0), // radius
                1, //  dummy
                ranRange(1,1)) // Speed
            )
            // console.log(`ax:${aX} aY:${aY}`)
    }
    return agents;

}
function draw_agents() {
    // // draws agents saved in global "floating_agents" variable
    floating_agents.forEach(agent => {
        agent.draw(context);
    });
}
function update_agents() {
    // // updates and redraws at each newframe agents saved in global "floating_agents" variable
    // x,y,width,height
    context.clearRect(0,0, context.canvas.width, context.canvas.height);
    floating_agents.forEach(agent => {
        // agent.update(1);
        agent.update();
        agent.draw(context);
    });
    requestAnimationFrame(update_agents)
}

// Run all functions inside
function SetCanvas(){

    // // // define W and H vars
    // // window dims, includes vertical scroll
    // var windW = window.innerWidth;
    // var windH = window.innerHeight;
    // // page dims
    var CanvpercPage = 1;
    // // // define W and H vars
    // // window dims, includes vertical scroll
    var windW = document.documentElement.clientWidth;
    var windH = document.documentElement.clientHeight;

    // var navHeight = document.getElementById("navbar").clientHeight;
    var navHeight = document.getElementById("navbar").clientHeight;
    // whole viewport including scrollbars
    // var windW = window.innerWidth;
    // var windH = window.innerHeight;

      // // // page dims
    window.canvasW = windW*CanvpercPage; 
    window.canvasH = windH*CanvpercPage-navHeight;
    
    // reset canvas width
    context.canvas.width = canvasW;
    context.canvas.height = canvasH;
    
    // var Npoints = Math.round(Math.max(windW, windH)/15)
    var Npoints = 100;
    window.floating_agents = AgentPopulator(canvasW, canvasH, Npoints)
    console.log(`wW: ${windW}, wH: ${windH} ::: Npoints ${Npoints}`)
    // draw_agents(); // call not neccesary
}


// Classes -------------------------------------------------

class VectorPos {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
};
class Dims {
    constructor(width, height) {
        this.x = width;
        this.y = height;
    }
};

class Agent {
    // // 
    // x: used as origin X position.
    // y: used as origin Y position.
    // maxW: stored into maxDims.x and used as arc radius.
    // maxH: stored into maxDims.y and not used (dummy).
    // V: used to define vel.x and vel.y based on range between [-V, V].
    constructor(x, y, maxW, maxH, V) {
        this.pos = new VectorPos(x,y);
        this.vel = new VectorPos(ranRange(V,-V), ranRange(V,-V));
        this.maxDims = new Dims(maxW, maxH); // Dims.x, Dims.y
    }

    update() {
        // V: update velocity
        // linear movement
        var xDummy = this.pos.x + this.vel.x;
        var yDummy = this.pos.y + this.vel.y;
        this.vel.x = (xDummy > 0 && xDummy < context.canvas.width) ? this.vel.x : -this.vel.x;
        this.vel.y = (yDummy > 0 && yDummy < context.canvas.height) ? this.vel.y : -this.vel.y;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;


        
        // console.log(`hello ctx.cvs.height: ${context.canvas.height}`)
        // console.log(`this.pos.y: ${this.pos.y}`)
        // console.log(`this.maxDims.x: ${this.maxDims.x}`)
        // console.log(`this.maxDims.y: ${this.maxDims.y}`)
        // console.log(`context.canvas.height in update: ${context.canvas.height}`)
        
        // // random vibration.
        // include V as parameter in update and call.
        // this.pos.x += ranRange(V,-V*2);
        // this.pos.y += ranRange(V*2,-V);
    }

    draw(context) {
        
        context.save();
        context.translate(this.pos.x, this.pos.y);
        context.fillStyle = "rgba(0,0,0,0.1)";
        context.lineWidth = 2;
        
        context.beginPath();
        context.arc(
            0,0, // x,y
            this.maxDims.x, // radius
            0, Math.PI*2 // startAngle, endAngle
            );
        context.fill();
        context.stroke();

        context.restore();

    }

}


// RunTime -------------------------------------------------

SetCanvas();

window.requestAnimationFrame(update_agents);
window.addEventListener('resize', SetCanvas);