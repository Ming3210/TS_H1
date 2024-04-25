"use strict";
class Player {
    constructor() {
        let playerData = localStorage.getItem('playerData');
        if (playerData) {
            this.player = JSON.parse(playerData);
        }
        else {
            this.player = [];
        }
    }
    renderPlayer() {
        let data = localStorage.getItem('playerData');
        if (data) {
            this.player = JSON.parse(data);
        }
        else {
            this.player = [];
        }
        let element = ``;
        let tbody = document.getElementById('tbody');
        for (let i = 0; i < this.player.length; i++) {
            element += `
        <tr>
                        <td>
                           <div class="left">
                            <div>
                                <i onclick="del(${this.player[i].id})" id="X" class="fa-solid fa-x"></i>
                                <i class="fa-solid fa-crown"></i>
                            </div>
                            <div>
                                <span>${this.player[i].name}</span>
                            </div>
                           </div>
                            
                           <div class="right">
                            <button onclick="minus(${this.player[i].id})" id="minus" class="opt"><i class="fa-solid fa-minus"></i></button>
                            <span>${this.player[i].score}</span>
                            <button onclick="add(${this.player[i].id})" id="add" class="opt"><i class="fa-solid fa-add"></i></button>
                           </div>
                        </td>
                        
                    </tr>
        `;
        }
        tbody.innerHTML = element;
    }
    createPlayer() {
        let name = document.getElementById("input").value;
        let score = 0;
        let id = Math.floor(Math.random() * 9999999999999);
        let objPlayer = {
            name: name,
            score: score,
            id: id
        };
        this.player.push(objPlayer);
        document.getElementById("input").value = "";
        localStorage.setItem("playerData", JSON.stringify(this.player));
    }
    deletePlayer(id) {
        for (let i = 0; i < this.player.length; i++) {
            if (this.player[i].id === id) {
                this.player.splice(i, 1);
            }
        }
        localStorage.setItem("playerData", JSON.stringify(this.player));
    }
    updatePlayer(id, check) {
        if (check == "add") {
            for (let i = 0; i < this.player.length; i++) {
                if (this.player[i].id === id) {
                    this.player[i].score++;
                    localStorage.setItem("playerData", JSON.stringify(this.player));
                    this.renderPlayer();
                    break;
                }
            }
        }
        if (check == "minus") {
            for (let i = 0; i < this.player.length; i++) {
                if (this.player[i].id === id && this.player[i].score > 0) {
                    this.player[i].score--;
                    localStorage.setItem("playerData", JSON.stringify(this.player));
                    this.renderPlayer();
                    break;
                }
            }
        }
    }
}
let player = new Player();
player.renderPlayer();
function adding() {
    player.createPlayer();
    player.renderPlayer();
    displayP();
}
function del(id) {
    player.deletePlayer(id);
    player.renderPlayer();
    displayP();
    displayM();
}
function add(id) {
    let check = "add";
    player.updatePlayer(id, check);
    displayM();
}
function minus(id) {
    let check = "minus";
    player.updatePlayer(id, check);
    displayM();
}
function displayP() {
    let data = localStorage.getItem("playerData");
    if (data) {
        let playerList = JSON.parse(data);
        document.getElementById("count").innerHTML = playerList.length;
    }
    else {
        document.getElementById("count").innerHTML = ``;
    }
}
displayP();
function displayM() {
    let sum = 0;
    let data = localStorage.getItem("playerData");
    if (data) {
        let playerInfo = JSON.parse(data);
        for (let i = 0; i < playerInfo.length; i++) {
            sum += player.player[i].score;
        }
        document.getElementById("point").innerHTML = "";
        document.getElementById("point").innerHTML = `${sum}`;
    }
}
displayM();
