/*this code is not complete and need more work because the idea was to detect collision between ball and the text and make the ball reflect far from text when they collaps, alot thanks to stakoverflow and 'Chris Cource' from youtube alrigatto cozaimas to you*/


var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var thanksStr = ["you" , "you", "are", "going", "to", "achieve", "your", "goal", "I", "trust"];
var i = 0;
var radius = 50;
var clicks = 0;
var mouse = {
    x : undefined,
    y : undefined
}
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redraw();
});
window.addEventListener('click', function(event) {
    //change the opacity of the ball to increase it from 0.5 and let it start from the mouse coordinates
    clicks++;
    mouse.x = event.clientX;
    mouse.y  = event.clientX;
    redrawMouseOver(mouse.x, mouse.y, clicks);

});
//circle object

function Circle(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.colorBall = randomHex();
    this.radius = radius;
    this.alpha = 0;
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.colorBall;
        ctx.fill();
    }
    this.move = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

//circle properties

var circle;
function redraw(){
    var xRandom = Math.random() * (innerWidth - radius * 2) + radius;
    var yRandom = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = Math.random() * 4 + 1;
    var dy = Math.random() * 4 + 1;
    circle = new Circle(xRandom, yRandom, dx, dy);
}
function redrawMouseOver(x, y, clicksNumber){
    var dx = Math.random() * 4 + 1;
    var dy = Math.random() * 4 + 1;
    circle = new Circle(x, y, dx, dy);
    if(clicksNumber % 2 != 0){
        circle.alpha = 0.7;
    }else {
        circle.alpha = 0.01;
    }
}

function drawText(txt, count, color){
    ctx.fillStyle = color;
    ctx.globalAlpha = count;
    ctx.font = 'normal 50px Acme';
    ctx.fillText(txt, canvas.width/2 - (ctx.measureText(txt).width/2), canvas.height/2);
}

var colorText = randomHex();
function startIt(count, change){
    if(change == 0){
        colorText = randomHex();
        i++
        if(i == thanksStr.length){
            i = 0;
        }
    }
    circle.move();
    var countPositive = Math.abs(count);
    drawText(thanksStr[i], countPositive/100, colorText);

}

//start animation
var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;
var count = 0;
var change = 0 ;
function goMove(){
    window.requestAnimationFrame(goMove);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    startIt(count, change);
    change++;
    count++;
    if(count == 100){
        count = -count;
    }
    if(change > 200){
        change = 0;
    }
}
redrawMouseOver();
redraw();
goMove();

//generate random Hex color

function randomHex(){
    var colorStr = '#';
    for(var j = 0; j < 6; j++){
        var x = Math.floor(Math.random() * 16);
        if(x > 9){
            switch(x){
                case 10 : x = 'a'; break;
                case 11 : x = 'b'; break;
                case 12 : x = 'c'; break;
                case 13 : x = 'd'; break;
                case 14 : x = 'e'; break;
                case 15 : x = 'f'; break;
                    }
        }
        colorStr += x;
    }
    return colorStr;
}
