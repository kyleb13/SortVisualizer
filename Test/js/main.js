var canvas;
var ctx;
var vals = [];
var current_index = 0;

function main() {
    canvas = document.getElementById("Canvas");
    ctx = canvas.getContext("2d");

    for (var x = 0; x < 100;x++) {
        vals.push(randInt(100) + 1);
    }
    draw();
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < 100; i++) {
        ctx.fillStyle = getRGBString(vals[i]);
        ctx.fillRect(i * 10, canvas.height, 8, -(vals[i] * 8));
    }
}

/*
 * Get the rgb value for a square based on the integer value. The sine function used
 * is designed so that there is a gradual shift from red to blue to green once the array is sorted.
 * Each function will return a value from 0 to 255, and will peak at specific values
 * 
 * 
 * base function: f(x) = 255sin(.031415919x)
 * 
 * red variant: 255sin(.031415919x+.5341)
 *      peaks at: 33
 * blue variant: 255sin(.031415919x-.50265)
 *      peaks at: 66
 * green variant: 255sin(.031415919x-1.5708)
 *      peaks at:100
 */
function getRGBString(value) {
    var red = 0;
    var blue = 0;
    var green = 0;
    var coefficient = .031415919;
    var rgbString = "rgba(";

    //use sine functions to get rgb values
    red = 255 * Math.sin(coefficient * value + .5341);
    blue = 255 * Math.sin(coefficient * value - .50265);
    green = 255 * Math.sin(coefficient * value - 1.5708);

    //set any negative values to 0
    if (red < 0) {
        red = 0;
    }
    if (blue < 0) {
        blue = 0;
    }
    if (green < 0) {
        green = 0;
    }

    //put the numbers into the rgb string
    rgbString += Math.round(red) + "," + Math.round(green) + "," + Math.round(blue) + ",1)";

    return rgbString;
}

function sortLoop() {
    selectSortStep(current_index++);
    draw();
}

function selectSortStep(idx) {
    var minidx = idx;
    for (var i = idx + 1; i < vals.length; i++) {
        if (vals[i] < vals[minidx]) {
            minidx = i;
        }
    }
    if (minidx != idx) {
        var temp = vals[idx];
        vals[idx] = vals[minidx];
        vals[minidx] = temp;
    }
}

function randInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
