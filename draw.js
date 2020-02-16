let draw = SVG('drawing');
let p;
let mouseDown = false;

const cursorMode = {
    TEXT: 1,
    DRAW: 2,
    ERASE: 3,
};
let currentCursor = cursorMode.TEXT;

let drawBtnToggle = false;
let eraseBtnToggle = false;

let drawColor = '#f06';
let drawWidth = 4;
const X_OFFSET = 0;
const Y_OFFSET = -50;


$('#size').change(function(){
    drawWidth = $('#size').val();   
});

$drawing = $("#drawing");   // create jquery object for drawings


// continues a path to the current position of mouse
function drawHandler(e) {
    // when the mouse is pressed, move to the position of the mouse and log it
    if (mouseDown && currentCursor === cursorMode.DRAW) {
        p.plot(p.array().toString().concat((e.pageX+X_OFFSET).toString(), ' ', (e.pageY+Y_OFFSET).toString()));
        console.log(e.pageX, e.pageY);
    }
}

// acts according to the current state of the mouse
$('#drawBtn').click(function () {
    console.log('click');
    // switches the from drawing mode to text mode when button is pressed
    if (currentCursor === cursorMode.DRAW) {
        currentCursor = cursorMode.TEXT;
        $("#drawingMode").hide();
        $("#textMode").show();
        $drawing.removeClass("front");
    }
    // switches from any mode to draw when button is pressed
    else {
        $("#drawingMode").show();
        $("#textMode").hide();
        $drawing.addClass("front");
        currentCursor = cursorMode.DRAW;
    }

    // if we are going to drawing mode, start a path
    if (currentCursor === cursorMode.DRAW) {
        // when the mouse button is pressed
        document.onmousedown = function (e) {
            mouseDown = true;   // set the flag

            p = draw.path('M'.concat((e.pageX+X_OFFSET).toString(), ' ', (e.pageY+Y_OFFSET).toString()));     // start a path
            p.fill('none');
            p.stroke({ color: drawColor, width: drawWidth, linecap: 'round', linejoin: 'round' });
        }
        // when the mouse button is released
        document.onmouseup = function () {
            mouseDown = false;  // unset the flag
        }
        // constantly check position of mouse and extend the path
        document.addEventListener('mousemove', drawHandler);
    }

    // if we are leaving the drawing mode, reset everything
    else {
        document.removeEventListener('mousemove', drawHandler);
        document.onmouseup = null;
        document.onmousedown = null;
        p.plot("");
    }
});


$('#eraseBtn').click(function () {
    
    // switches the from erasing mode to text mode when button is pressed
    if (currentCursor === cursorMode.ERASE) {
        currentCursor = cursorMode.TEXT;
        $("#drawingMode").hide();
        $("#textMode").show();
        $drawing.removeClass("front");
    }
    // switches from any mode to erase when button is pressed
    else {
        $("#drawingMode").show();
        $("#textMode").hide();
        $drawing.addClass("front");
        console.log("I'M GOING IN HERE");
        currentCursor = cursorMode.ERASE;
    }

    // if we are going to erasing mode
    if (currentCursor === cursorMode.ERASE) {
        // continuously check if the cursor overlaps with figures
        $drawing.find('path, circle, rect').mouseenter((e) => {
            if (!mouseDown) return; // if the mouse button is not pressed, don't do anything
            $(e.target).remove();   // if the mouse button is pressed, remove the figure
        });

        // set flags for whether the mouse is being pressed
        document.onmousedown = function (e) {
            console.log("DOWN");
            mouseDown = true;
        }
        document.onmouseup = function () {
            console.log("UP");
            mouseDown = false;
        }
    }
    // if we are leaving erasing mode, reset everything
    else {
        $drawing.find('path, circle, rect').removeEventListener('mouseenter');
    }

});


// $drawing.filter('path, circle, rect').mouseover((e) => {
//     alert("testing")
// });

$("#colorPicker").change(()=>{
    drawColor = $("#colorPicker").val();
    $("#colorBtn").css('color', drawColor);
});