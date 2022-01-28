var menu_button = document.getElementById("menu-button");
var navbar = document.getElementById("navbar");
var mainbod = document.getElementById("mainbod");
var nav_ul = document.querySelector("nav ul");
var menu_li = document.getElementsByClassName("menu-li");


// Control navbar ----
// navbar functions
function ShowLoop(loopject, d_style=true) {
    var displaystyle = (d_style) ? '' : 'block';
   for (var i = 0; i < loopject.length; i++)
       loopject[i].style.display = displaystyle;
};
function HideLoop(loopject) {
    for (var i = 0; i < loopject.length; i++)
       loopject[i].style.display = 'none';
};
function OpenM() {
    // menu_button.textContent = "🞬";
    menu_button.textContent = "\u2715";
    // navbar.style.height = "100vh";
    navbar.style.height = "100vh";
    navbar.style.width = "100vw";
    
    mainbod.style.display='none';

    ShowLoop(menu_li, d_style=false);
    // mainbod.style.display = 'none'
};
function CloseM(hide=true) {
    menu_button.textContent = "☰";
    navbar.style.height = "";
    mainbod.style.display='';

    (hide === true) ? HideLoop(menu_li) : ShowLoop(menu_li);
    // mainbod.style.display = ''
};

function OpenCloseMenu(){
    var windW = document.documentElement.clientWidth;
    navbar.clientWidth = windW;
    if (menu_button.textContent == "☰"){
        OpenM();
    } else {
        CloseM();
    }
};
function CloseResized(){
    // dummy function to close without hiding elements when window resize
    CloseM(hide=false);
};

// - - - - - - - -
// Fill navbar menu
// - - - - - - - -
function fillNavbar(){

    // var config_array;
    fetch("./config/navbar.json")
    .then(res => res.json())
    .then(data => obj = data)
    .then(() => fillNav(obj));
    
    
    // https://medium.com/@akshaygarg576/how-to-use-templates-in-vanilla-javascript-d550e328b33b
    // add nav elements
    const fillNav = (config_array) => {
        config_array.navbar.forEach((navlink) => {
            nav_li = `
            <li class='menu-li'>
            <a href="${navlink.href}">${navlink.txt}</a>
            </li>`;
                nav_ul.innerHTML += nav_li;
            })
        }
        
};


// Runtime
fillNavbar();
menu_button.addEventListener('click', OpenCloseMenu);
window.addEventListener('resize', CloseResized);