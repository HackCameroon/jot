// initialize SVG.js
var draw = SVG('drawing');
let mouseDown = false;
let path;  
const COLOR = '#f06';
const WIDTH = 4;


// RENAME THIS FUNCTION -dc
function handler(e) {
    //alert(mouseDown);
    if(mouseDown){
        // e = e || window.event;
        
        path.plot(path.array().toString().concat(e.pageX.toString(),' ',e.pageY.toString()));
        console.log(e.pageX, e.pageY);
    }
}

document.onmousedown = function(e) { 
    mouseDown = true;
    path = draw.path('M'.concat(e.pageX.toString(),' ',e.pageY.toString()));
    path.fill('none');
    path.stroke({ color: COLOR, width: WIDTH, linecap: 'round', linejoin: 'round' });
}

document.onmouseup = function() {
    mouseDown = false;
}

document.addEventListener('mousemove', handler);