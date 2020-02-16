// initialize SVG.js
let draw = SVG('drawing');
let p;
let mouseDown = false;
let drawBtnToggle = false;
let eraseBtnToggle = false;

let drawColor = '#f06';
const drawWidth = 4;


function drawHandler(e) {
    if (mouseDown) {
        p.plot(p.array().toString().concat(e.pageX.toString(), ' ', e.pageY.toString()));
        console.log(e.pageX, e.pageY);
    }
}

$('#drawBtn').click(function () {
    drawBtnToggle = !drawBtnToggle;
    if (drawBtnToggle) {
        document.onmousedown = function (e) {
            mouseDown = true;
            p = draw.path('M'.concat(e.pageX.toString(), ' ', e.pageY.toString()));
            p.fill('none');
            p.stroke({ color: drawColor, width: drawWidth, linecap: 'round', linejoin: 'round' });
        }

        document.onmouseup = function () {
            mouseDown = false;
        }

        document.addEventListener('mousemove', drawHandler);
    }
    else {
        document.removeEventListener('mousemove', drawHandler);
        document.onmouseup = null;
        document.onmousedown = null;
    }
});


$drawing = $("#drawing");

function eraseHandler() {
    if (mouseDown) {
        console.log("erase scan");
        $(p.node).mouseover((e) => {
            // alert("testing");
        });
    }
}

$('#eraseBtn').click(function () {
    eraseBtnToggle = !eraseBtnToggle;
    if (eraseBtnToggle) {
        console.log("IM IN HERE");
        document.onmousedown = function (e) {
            console.log("DOWN");
            mouseDown = true;
        }
        document.onmouseup = function () {
            mouseDown = false;
            console.log("UP");
        }
        document.addEventListener('mousemove', eraseHandler);
    }
    else {
        document.removeEventListener('mousemove', drawHandler);
        document.onmouseup = null;
        document.onmousedown = null;
    }

});


// $drawing.filter('path, circle, rect').mouseover((e) => {
//     alert("testing")
// });

$("#colorPicker").change(()=>{
    drawColor = $("#colorPicker").val();
    $("#colorBtn").css('color', drawColor);
});