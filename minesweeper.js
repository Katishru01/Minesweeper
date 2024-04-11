let bigBox = document.getElementsByClassName("board-hide")[0];
for (let i = 0; i < 100; i++) {
    const boxDiv = document.createElement("div");
    boxDiv.setAttribute("class", "box");
    bigBox.appendChild(boxDiv);
}
let boxes = document.getElementsByClassName("box");
let flag = document.getElementsByClassName("flag")[0];
let flagged = false;
let bttn = document.querySelectorAll(".bttn-hide")[0];
let lost = document.getElementsByClassName("lost")[0];
let reset = document.getElementsByClassName("reset")[0];
let play = document.getElementsByClassName("play")[0];
let won = document.getElementsByClassName("won")[0];
let count = 0;
let firstClick = true;

play.addEventListener("click", () => {
    bigBox.classList.remove("board-hide");
    bigBox.classList.add("board");
    bttn.classList.remove("bttn-hide");
    bttn.classList.add("bttn");
    play.classList.remove("play");
    play.classList.add("playHide");
    lost.classList.add("lost");
    lost.classList.remove("showLost");
    assignPosition();
    randomFlag();
    calculateBomb();

})
function vanish() {
    window.location.reload();
}
box = Array.from(boxes)
let cordinates = [[-11, -1, -1], [-10, 0, -1], [-9, 1, 1], [-1, -1, 0], [1, 1, 0], [9, -1, 1], [10, 0, 1], [11, 1, 1]];
//cordinates=Array.from(cordinates)
function randomFlag() {
    let x = 10;
    let y = 0;
    for (let i = 0; i < 10; i++) {
        let rndmNum = Math.floor((Math.random() * (x - y) + y));
        boxes[rndmNum][2] = "💣";
        console.log(rndmNum);
        x = x + 10;
        y = y + 10;
    }
}
function calculateBomb() {
    arr = [[-11, -1, -1], [-10, 0, -1], [-9, 1, 1], [-1, -1, 0], [1, 1, 0], [9, -1, 1], [10, 0, 1], [11, 1, 1]];
    let i = 0;
    while (i < 100) {
        if (boxes[i][2] == "💣") {
            arr.forEach(elm => {
                let pos = i + Number.parseInt(elm[0]);
                if (pos >= 0 && pos <= 99) {
                    let x = (Number.parseInt(box[i][0]) + Number.parseInt([elm[1]]));
                    let y = (Number.parseInt(box[i][1]) + Number.parseInt([elm[2]]));
                    if (x >= 0 && x < 10 && 0 <= y && y < 10 && boxes[pos][2] != "💣") {
                        box[pos][2] = Number.parseInt(box[pos][2]) + Number.parseInt(1);
                    }
                }
            })
        }
        i = i + 1;
    }
}
function disclose(boxs, cordinates) {
    box[boxs][3] = true;
    boxes[boxs].classList.add("box-clicked");
    for (let cordnt of cordinates) {
        let pos = boxs + Number.parseInt(cordnt[0]);
        if (pos >= 0 && pos <= 99) {
            let x = (Number.parseInt(box[boxs][0]) + Number.parseInt([cordnt[1]]));
            let y = (Number.parseInt(box[boxs][1]) + Number.parseInt([cordnt[2]]));
            if (x >= 0 && x < 10 && 0 <= y && y < 10 && boxes[pos][2] != "💣" && box[pos][3] != true) {
                if (boxes[pos].innerHTML == "🚩") {
                    count = count - 1;
                    boxes[pos].innerHTML = "";
                    flag.innerHTML = "🚩" + Number.parseInt(10 - `${count}`);
                }
                if (box[pos][2] != 0) {
                    boxes[pos].innerHTML = box[pos][2];
                    boxes[pos].classList.add(`f${box[pos][2]}`);
                    box[pos][3] = true;
                    boxes[pos].classList.add("box-clicked");
                }
                else {
                    disclose(pos, cordinates);
                }
            }
        }

    }


}
function show() {
    for (let bx of boxes) {
        setTimeout(() => {
            if (bx[2] == "💣") {

                bx.innerHTML = "💣";
            }
        }, 500)
    }
}
function check() {
    let res = true;
    for (let div = 0; div < boxes.length; div++) {
        if (boxes[div][2] != "💣") {
            if (box[div][3] == false) {
                res = false;
                return;
            }
        }
        else {
            if (boxes[div].innerHTML != "🚩") {
                res = false;
                return;
            }
        }
    }
    if (res == true) {
        bigBox.classList.remove("board");
        bigBox.classList.add("board-hide");
        play.classList.remove("playHide");
        play.classList.add("play");
        won.classList.remove("won");
        won.classList.add("wonShow");
        bttn.classList.remove("bttn");
        bttn.classList.add("bttn-hide");
        setTimeout(vanish, 1500);
    }
}
function end() {
    bigBox.classList.remove("board");
    bigBox.classList.add("board-hide");
    lost.classList.remove("lost");
    lost.classList.add("showLost");
    bttn.classList.remove("bttn");
    bttn.classList.add("bttn-hide");
    play.classList.remove("playHide");
    play.classList.add("play");
    setTimeout(vanish, 1500);

}
function replace(div) {
    for (let r = 0; r < boxes.length; r++) {
        if (box[r][2] == 0 && boxes[r][2] != "💣") {
            boxes[r][2] = "💣";
            boxes[div][2] = "";
            console.log(boxes[r]);
            return;
        }
    }
}
for (let div = 0; div < boxes.length; div++) {
    boxes[div].addEventListener("click", () => {
        if (boxes[div].innerHTML == "🚩") {
            boxes[div].innerHTML = "";
            count = count - 1;
            flag.innerHTML = "🚩" + Number.parseInt(10 - `${count}`);


        }
        else {
            if (flagged == true) {
                boxes[div].innerHTML = "🚩";
                count = count + 1;
                flag.innerHTML = "🚩" + Number.parseInt(10 - `${count}`);
                flagged = false;
            }
            else {
                if (firstClick == true) {
                    if (boxes[div][2] == "💣") {
                        replace(div);
                        assignPosition();
                        calculateBomb();
                        disclose(div, cordinates);
                    }
                }
                firstClick = false
                if (boxes[div][2] == "💣") {
                    boxes[div].innerHTML = "💣";
                    show();
                    setTimeout((end), 2000);

                }

                else if (box[div][2] != 0 && boxes[div][3] != true) {
                    boxes[div].innerHTML = box[div][2];
                    box[div][3] = true;
                    boxes[div].classList.add(`f${box[div][2]}`);
                    boxes[div].classList.add("box-clicked");
                }
                else {
                    disclose(div, cordinates);
                }
            }
        }
        check();
    }
    )
}

function assignPosition() {
    let px = 0;
    let py = 0;
    let flag = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            box[py] = [j, px];
            box[py].push(Number.parseInt(0));
            box[py].push(false);
            py = py + 1;
        }
        px = px + 1;
    }
    //console.log(box)
}
reset.addEventListener("click", () => {
    bigBox.classList.remove("board");
    bigBox.classList.add("board-hide");
    bttn.classList.remove("bttn");
    bttn.classList.add("bttn-hide");
    play.classList.remove("playHide");
    play.classList.add("play");
    vanish();
    assignPosition();
    randomFlag();
    calculateBomb();

})

flag.addEventListener("click", () => {
    if (count > 10) {
        alert("flag exhausted");
    }
    else {
        flagged = true;
    }
})