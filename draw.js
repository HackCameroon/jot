// initialize SVG.js
var draw = SVG('drawing');

// event handler function
function handler(e) {
    e = e || window.event;

    var pageX = e.pageX;
    var pageY = e.pageY;

    console.log(pageX, pageY);

    draw.path()
}

// attach handler to the click event of the document
document.addEventListener('mousemove', handler);

// draw pink square
draw.rect(100, 100).move(100, 50).fill('#f06');