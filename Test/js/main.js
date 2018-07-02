var canvas;
var ctx;
var vals = [];

function main() {
    canvas = document.getElementById("Canvas");
    ctx = canvas.getContext("2d");
    /*ctx.beginPath();
    ctx.rect(20, 40, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePat();*/
    for (var x = 0; x < 100;x++) {
        vals.push(randInt(100) + 1);
    }
    draw();
}

function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for (var i = 0; i < 100; i++) {
        ctx.beginPath();
        ctx.rect(i * 10, 800, 8, -(vals[i] * 8));
        if (vals[i] <= 33) {
            ctx.fillStyle = "rgba(0,0," + vals[i] * 8 + ",1)";
        } else if (vals[i] > 66) {
            ctx.fillStyle = "rgba(" + vals[i] * 2 + ",0,0,1)";
        } else {
            ctx.fillStyle = "rgba(0," + vals[i] * 4 + ",0,1)";
        }
        ctx.fill();
        ctx.closePath();
    }
}

function sortLoop() {

    for (var i = 0; i < 100; i++) {
        console.log(i);
        selectSortStep(i);
        setTimeout(draw(), 500);
    }
}

function selectSortStep(idx) {
    var minidx = -1;
    for (var i = idx + 1; i < vals.length; i++) {
        if (vals[i] < vals[idx]) {
            minidx = i;
        }
    }
    if (minidx != -1) {
        var temp = vals[idx];
        vals[idx] = vals[minidx];
        vals[minidx] = temp;
    }
}

function randInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
