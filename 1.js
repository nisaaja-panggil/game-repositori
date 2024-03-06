let mainAnimeId, 
    splashScreen,
    startBtn;
let ctx = null;
let mile = 1;
let isPlaying = false;
let [W, H] = [innerWidth, innerHeight];

// get random value between ```min``` and ```max```
const MIN_MAX = (min, max) => parseInt(Math.random() 
    * (max - min + 1) + min);

// get random data from an array 
const random = array => array[Math.floor(Math.random()
    * array.length)];

// update mile's count
(() => {
    let lastTime = 0;
    const INTERVAL = 400;
    const updater = currentTime => {
        if(currentTime < lastTime) {
            requestAnimationFrame(updater);
            return;
        }
        lastTime = currentTime + INTERVAL; 
        mile--;
        requestAnimationFrame(updater);
    }
    requestAnimationFrame(updater);
})();


// life's data 
const lifeData = {
    src: "https://i.ibb.co/wNDMhwK/heart-sprite-png.png",
    width: 901,
    height: 300,
    column: 3, 
    row: 1
};

const life = new Image();
life.onload = () => {};
life.src = lifeData.src;

let lifeStart = 0;
let lifeDimension = lifeData.width / lifeData.column;


class Road {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 5;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
        this.draw();
    }
}

// road params 
const leftPedWalk = new Road(0, 0, 30, H, "green");
const leftPedWalkBound = new Road(leftPedWalk.x + leftPedWalk.width, 
    0, 15, H, "lightgray");

const rightPedWalk = new Road(W - (leftPedWalk.x + leftPedWalk.width), 
    0, leftPedWalk.width, H, "green");
const rightPedWalkBound = new Road(rightPedWalk.x - leftPedWalkBound.width, 
    0, leftPedWalkBound.width, H, "lightgray");

const mainRoad = new Road(leftPedWalkBound.x + leftPedWalkBound.width, 0, 
    rightPedWalkBound.x - (leftPedWalkBound.x + leftPedWalkBound.width), H, 
    "darkgray");

let lanedivider = [];
let laneLastTime = 0;
let laneInterval = 1000;
const lanedivWidth = 10;
const lanedivPos = mainRoad.x + (rightPedWalkBound.x - mainRoad.x)/2;

const pushLaneDivider = currentTime => {
    if(currentTime < laneLastTime) {
        requestAnimationFrame(pushLaneDivider);
        return;
    }
    laneLastTime = currentTime + laneInterval;

    for(let i=0; i<1; i++) {
        x = lanedivPos - (lanedivWidth / 2);
        y = -(MIN_MAX(100, 120));
        width = lanedivWidth
        height = 70;
        lanedivider.push(new Road(x, y, width, height, "white"));
    }
    //if(lanedivider.length >= 4) lanedivider.splice(0, 3);
   requestAnimationFrame(pushLaneDivider);
}
requestAnimationFrame(pushLaneDivider);


class Car {
    constructor(src, x, y, speed, type) {
        this.img = new Image();
        this.img.onload = () => {};
        this.img.src = src;
        this.x = x;
        this.y = y;
        this.type = type;
        this.speed = speed;
        this.width = 70;
        this.height = 100;
        this.maxSpeed = 13;
        this.life = 3;
        this.speedDir = 0;
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, 
            this.width, this.height);
    }

    upgradeSpeed() {
        if(this.speedDir === 2) {
            this.speed += .2;
            if(this.speed >= this.maxSpeed) 
                this.speed = this.maxSpeed;
        } else if(this.speedDir === 0) {
            this.speed -= .2;
            if(this.speed <= 0) 
                this.speed = 0;
        }
            
    }

    update() {
        this.y += this.speed;
        this.draw();
    }
}

const rightVehicle = {
    holder: [],
    src:[
        "https://image.flaticon.com/icons/svg/1698/1698104.svg",
        "https://image.flaticon.com/icons/svg/198/198340.svg",
        "https://image.flaticon.com/icons/svg/198/198335.svg",
        "https://image.flaticon.com/icons/svg/198/198344.svg",
        "https://image.flaticon.com/icons/svg/198/198341.svg"

    ], 
};

// push new car to cars array after every 1.5sec;
(() => {
    let lastTime = 0;
    const INTERVAL = 4000;
    const updater = currentTime => {
        if(currentTime < lastTime) {
            requestAnimationFrame(updater);
            return;
        }
        lastTime = currentTime + INTERVAL;
        for(let i=0; i<1; i++) {
            let x = MIN_MAX(lanedivPos + (lanedivWidth / 2),  
                rightPedWalkBound.x - 80);
            let y = -105;//(MIN_MAX(5, 8));
            let speed = MIN_MAX(4, 6);
            rightVehicle.holder.push(new Car(random(rightVehicle.src), x, 
                y, speed, "UP"));
        }
        requestAnimationFrame(updater);
    }
    requestAnimationFrame(updater);
})();


const leftVehicle = {
    holder: [],
    src: [
        "https://image.flaticon.com/icons/svg/741/741407.svg",
        "https://image.flaticon.com/icons/svg/171/171240.svg",
        "https://image.flaticon.com/icons/svg/214/214280.svg",
        "https://image.flaticon.com/icons/svg/2149/2149509.svg",
        "https://image.flaticon.com/icons/svg/2160/2160312.svg",
        "https://image.flaticon.com/icons/svg/619/619127.svg",
        "https://image.flaticon.com/icons/svg/619/619115.svg",
        "https://image.flaticon.com/icons/png/128/198/198348.png",
        "https://image.flaticon.com/icons/svg/198/198340.svg",
        "https://image.flaticon.com/icons/svg/146/146269.svg"
    ]
};

(() => {
    let lastTime = 0;
    const INTERVAL = 8500;
    const updater = currentTime => {
        if(currentTime < lastTime) {
            requestAnimationFrame(updater);
            return;
        }
        lastTime = currentTime + INTERVAL;
        for(let i=0; i<1; i++) {
            let x = MIN_MAX(leftPedWalkBound.x + leftPedWalkBound.width, 
                lanedivPos - 80);
            let y = -105;//(MIN_MAX(5, 8));
            let speed = MIN_MAX(5, 8);
            leftVehicle.holder.push(new Car(random(leftVehicle.src), x, 
            y, speed, "UP"));
        }
        requestAnimationFrame(updater);
    }
    requestAnimationFrame(updater);

})();


let player = new Car(
rightVehicle.src[0], lanedivPos, H-100, 0, "PLAYER");

let toolbar = new Road(0, 0, W, 35, "rgba(0, 0, 0, .5)");

// collision detection 
const isCollided = (A, B) => A.x + A.width > B.x  && B.x + B.width > A.x
    && A.y + A.height > B.y && B.y + B.height > A.y;


// update() : everything to be updated on here
const update = () => {
    if(ctx == null) return; 

    leftPedWalk.draw();
    leftPedWalkBound.draw();

    rightPedWalk.draw();
    rightPedWalkBound.draw();

    mainRoad.draw();
    
    for(var i=lanedivider.length-1; i>=0; i--) {
        lanedivider[i].update();
        if(lanedivider[i].y > H) {
            lanedivider.splice(i, 1);
        }
    }

    player.upgradeSpeed();
    player.draw();

    ctx.fillStyle = "red";
    ctx.font = "bold 50px Courier New";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for(var i=(rightVehicle.holder).length-1; i>=0; i--) {
        (rightVehicle.holder)[i].update();
        (rightVehicle.holder)[i].speed += player.speed;
        if((rightVehicle.holder)[i].y > H) {
            (rightVehicle.holder).splice(i, 1);
        } else if (isCollided((rightVehicle.holder)[i], player)) {
            lifeStart += lifeDimension;
            (rightVehicle.holder).splice(i, 1);
            player.life -= 1;

            if(player.life <= 0) {
                isPlaying = false;
                cancelAnimationFrame(mainAnimeId);
                document.querySelector("#gameover").innerHTML = "GAME OVER";
                animate();
            }
        }
    }

    for(var i = (leftVehicle.holder).length-1; i>=0; i--) {
        (leftVehicle.holder)[i].update();
        (leftVehicle.holder)[i].speed += player.speed;
        if((leftVehicle.holder)[i].y > H) {
            (leftVehicle.holder).splice(i, 1);
        } else if (isCollided((leftVehicle.holder)[i], player)) {
            lifeStart += lifeDimension;
            (leftVehicle.holder).splice(i, 1);
            player.life -= 1;

            if(player.life <= 0) {
                isPlaying = false;
                cancelAnimationFrame(mainAnimeId);
                document.querySelector("#gameover").innerHTML = "GAME OVER";
                animate();
            }
        }
    }

    if(mile <= 0) {
        mile = 0;
        leftVehicle.holder = [];
        rightVehicle.holder = [];
        player.y -= 3;
        if(player.y  === 0) {
            isPlaying = false;
            cancelAnimationFrame(mainAnimeId);
            document.querySelector("#gameover").innerHTML = "CONGRATS";
            animate();
        }
    }

    // toolbar
    toolbar.draw();
    ctx.fillStyle = "lightgray";
    ctx.font = "bold 15px Courier New";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`Miles: ${mile}`, 50, 15);
    ctx.fillText(`Speed: ${Math.round(player.speed) + 1}m/sec`, W/2, 15);

    ctx.drawImage(life, lifeStart, 0, lifeDimension, lifeData.height / 1,
         W - 40, 0, 35, 35);
}


// animate() : main animation starts here
const animate = () => {
    if(isPlaying) {
        splashScreen.style.display = "none";
        ctx.clearRect(0, 0, W, H);
        mainAnimeId = requestAnimationFrame(animate);
        update();
    } else {
        splashScreen.style.display = "block";
        update();
    }
}


const startGame = () => {
    isPlaying = true;
    lanedivider = [];
    leftVehicle.holder = [];
    rightVehicle.holder = [];
    player.life = 3;
    mile = 1200;
    lifeStart = 0;
    player.x = lanedivPos;
    player.y = H - 100;
    animate();
}


// set splash Screen 
const splash = () => {
    if(splashScreen == null) return;
    splashScreen.innerHTML = `
        <center>
            <h1>Route</h1>
            <p>
            You are to complete the journey without crashing.
            if you crash with some other cars during the journey thrice and 
            consecutively, then <b>GAME OVER</b>
            </p>
            <h1 id="loading">Loading…</h1>
            <h1 style="color:red" id="gameover"></h1>
            <input type="button" id="startBtn" value="Start" style="display:none">
        </center>
    `
}



// All events on here 
const eventHandler = () => {
    document.getElementById("startBtn").onclick = () => startGame();

    const checkPlayerMaxMove = () => {
        if(player.x <= (leftPedWalkBound.x + leftPedWalkBound.width)) 
            player.x = leftPedWalkBound.x + leftPedWalkBound.width;
        else if(player.x + player.width >= (rightPedWalkBound.x))
            player.x = rightPedWalkBound.x - player.width;
    }

    ctx.canvas.addEventListener("mousemove", e=>{
        player.x = e.clientX - (player.width / 2);
        checkPlayerMaxMove();
    });

    ctx.canvas.addEventListener("touchmove", e => {
        let touch = e.changedTouches[0];
        player.x = touch.clientX - (player.width / 2);
        checkPlayerMaxMove();
    });

    ctx.canvas.addEventListener("touchstart", e => {
        player.speedDir = 1;
    });

    ctx.canvas.addEventListener("touchend", e => {
        player.speedDir = 0;
    });

    const keyDown = e => {
        if(e.keyCode === 37) 
            player.x -= 10;
        else if(e.keyCode === 39)
            player.x += 10;
        else if(e.keyCode === 38) {
            player.speed = 1;
        }
        else if(e.keyCode === 40) {
            player.speed = 0;
        }
        checkPlayerMaxMove();
    }

    window.addEventListener("keydown", keyDown);
    window.removeEventListener("keyup", keyDown);
}


// init function : run @ unload event
const init = () => {
    const canvas = document.createElement("canvas");
    [canvas.width, canvas.height] = [W, H];
    document.body.insertBefore(canvas, 
        document.body.childNodes[1]);

    splashScreen = document.querySelector("#splash-screen");

    ctx = canvas.getContext("2d");

    splash();
    animate();
    eventHandler();
    
    setTimeout(()=>{
        document.getElementById("loading").style.display = "none";
        document.getElementById("startBtn").style.display = "block";
    },15000);
}

window.addEventListener("load", init);