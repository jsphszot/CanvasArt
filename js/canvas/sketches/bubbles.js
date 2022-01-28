
import {ranRange} from "../utility_functions.js"

var canvas = document.getElementById('canvas01');
var context = canvas.getContext('2d');

// Classes ------------

class Coordinates {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
};
class Dimensions {
    constructor(width, height) {
        this.w = width;
        this.h = height;
    }
};
class Agent {
    constructor(x,y, w, h, v) {
        this.coordinates = new Coordinates(x,y);
        this.speed = new Coordinates(ranRange(v, -v), ranRange(v, -v));
        this.dimensions = new Dimensions(w,h);
        this.radius = Math.max(w,h);
    };

    draw(context) {
        context.save();

        context.translate(this.coordinates.x, this.coordinates.y);
        context.fillStyle = "rgba(0,0,0,0.1)";
        context.lineWidth = 2;

        context.beginPath();
        context.arc(0,0, this.radius, 0, Math.PI*2);
        context.fill(); //contents inside shape
        context.stroke(); //outline

        context.restore();
    }

    update() {
        var next_x = this.coordinates.x + this.speed.x;
        var next_y = this.coordinates.y + this.speed.y;
        // control if reaches end of canvas (bounce back)
        this.speed.x = (next_x > 0 && next_x < context.canvas.width) ? this.speed.x : -this.speed.x;
        this.speed.y = (next_y > 0 && next_y < context.canvas.height) ? this.speed.y : -this.speed.y;
        this.coordinates.x += this.speed.x;
        this.coordinates.y += this.speed.y;
    };
};

// Functions ------------

function AgentPopulator(x, y, NofAgents, r) {
    const agents = [];
    for (let i=0; i<NofAgents; i++){
        var randx = ranRange(x, 0);
        var randy = ranRange(y, 0);
        var radius = ranRange(r, 0);
        var speed = ranRange(1,0.5);
        agents.push(
            // agents x, y coord, radius, dummy height, and speed
            new Agent(randx, randy, radius, 1, speed)
        );
    };
    return agents;
};

// Global Functions ------------
function update_agents() {
    // // updates and redraws at each newframe agents 
    // // saved in global "floating_agents" variable
    context.clearRect(0,0, context.canvas.width, context.canvas.height);
    floating_agents.forEach(agent => {
        agent.update();
        agent.draw(context);
    });
    requestAnimationFrame(update_agents);
};
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

    var Npoints = 100;
    // var Npoints = Math.round(Math.max(windW, windH)/5);
    // var MaxRadius = Npoints/5; //  or 10 is cute, 50 is fine
    var MaxRadius = 20; 
    window.Marioesque=true;
    window.ConnectLines=true;
    window.floating_agents = AgentPopulator(canvasW, canvasH, Npoints, MaxRadius);
    // console.log(`wW: ${windW}, wH: ${windH} ::: Npoints ${Npoints}, MaxR ${MaxRadius}`)
}

// RunTime -------------------------------------------------
SetCanvas();
window.requestAnimationFrame(update_agents);
window.addEventListener('resize', SetCanvas);