//canvas that is drawn on
var canvas;
//drawing context of canvas
var ctx;
//array of values to be sorted
var vals = [];
//current sort index, for iterative algorithms
var current_index = 0;
//slider that controls animation speed
var speedSlider;
var animationSpeed = 50;
var keepSorting;
var algorithm = 1;
var numBox;
var runButton;
var stepButton;
var stepBox;

function main(inital_load) {
    if (inital_load) {
        canvas = document.getElementById("Canvas");
        ctx = canvas.getContext("2d");
        speedSlider = document.getElementById("speedSlider");
        runButton = document.getElementById("start_button");
        stepButton = document.getElementById("step_button");
        stepBox = document.getElementById("step_box");
        numBox = document.getElementById("num_box");
        ctx.textBaseline = "top";
    } else {
        vals = []; 
        current_index = 0;
    }
    for (var x = 0; x < 100;x++) {
        vals.push(randInt(100) + 1);
    }
    draw();
    updateSpeedText();
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < 100; i++) {
        ctx.fillStyle = getRGBString(vals[i]);
        ctx.fillRect(i * 10, canvas.height, 8, -(vals[i] * 8));
        if (numBox.checked) {
            ctx.save();
            ctx.font = "8px mySquareFont";
            ctx.fillStyle = "black";
            ctx.translate(i * 10 +4 /*4 is to center the text over bar*/, canvas.height - (vals[i] * 8));
            ctx.textAlignment = "center";
            ctx.rotate(-45*(Math.PI / 180));
            ctx.fillText(vals[i], 0, -8);
            ctx.restore();
        }
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

function animateSort() {
    if (!isSorted()) {
        if (runButton.innerHTML == "▶ Start Sorting") {
            keepSorting = setInterval(sortLoop, animationSpeed);
            runButton.innerHTML = "❚❚ Pause Sorting";
        } else if (runButton.innerHTML == "❚❚ Pause Sorting") {
            clearInterval(keepSorting);
            runButton.innerHTML = "▶ Start Sorting";
        }
    }
}

function setAlgorithm(alg_num) {
    algorithm = alg_num;
}

function handleStepBoxChange() {
    if (stepBox.checked) {
        runButton.disabled = true;
        stepButton.disabled = false;
        if (runButton.innerHTML == "❚❚ Pause Sorting") {
            clearInterval(keepSorting);
            runButton.innerHTML = "▶ Start Sorting";
        }
    } else {
        runButton.disabled = false;
        stepButton.disabled = true;
    }
}

function sortLoop() {
    selectSortStep(current_index++);
    draw();
    if (current_index == vals.length) {
        clearInterval(keepSorting);
        runButton.innerHTML = "▶ Start Sorting";
    }
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

function updateSpeedText() {
    var speedli = document.getElementById("animationSpeed");
    speedli.innerHTML = "Animation Speed: " + speedSlider.value + " ms";
    animationSpeed = speedSlider.value;
    if (runButton.innerHTML == "❚❚ Pause Sorting") {
        clearInterval(keepSorting);
        keepSorting = setInterval(sortLoop, animationSpeed);
    }
}

function randInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function isSorted() {
    for (var i = 1; i < vals.length; i++) {
        if (vals[i - 1] > vals[i]) {
            return false;
        }
    }
    return true;
}
