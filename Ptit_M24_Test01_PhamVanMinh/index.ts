interface IPlayer {
    name: string
    score: number
    id: number
}

class Player{
    player: IPlayer[]
    
   constructor(){
    let playerData:string|null = localStorage.getItem('playerData');
    if (playerData) {
        this.player = JSON.parse(playerData);
    } else {
        this.player = [];
    }
   }
   renderPlayer():void{
    let data:string|null = localStorage.getItem('playerData');
    if (data) {
        this.player = JSON.parse(data);
    } else {
        this.player = [];
    }
    let element = ``
    let tbody = (<HTMLInputElement>document.getElementById('tbody'))
    for(let i = 0; i < this.player.length; i++){
        element+=`
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
        `
    }
    tbody.innerHTML = element;
   }
   createPlayer():void{
    let name:string = (<HTMLInputElement>document.getElementById("input")).value
    let score:number = 0
    let id:number = Math.floor(Math.random()*9999999999999)
    let objPlayer = {
        name:name,
        score:score,
        id:id
    }
    this.player.push(objPlayer);
    (<HTMLInputElement>document.getElementById("input")).value = "";
    localStorage.setItem("playerData", JSON.stringify(this.player))
   }
   deletePlayer(id:number):void{
    for(let i = 0; i < this.player.length; i++){
        if(this.player[i].id === id){
            this.player.splice(i,1)
        }
    }
    localStorage.setItem("playerData", JSON.stringify(this.player))
   }
   updatePlayer(id:number, check:string):void{
    if(check == "add"){
        for(let i = 0; i < this.player.length; i++){
            if(this.player[i].id === id){        
                    this.player[i].score++
                    localStorage.setItem("playerData", JSON.stringify(this.player))
                    this.renderPlayer()
                    break
            }
        }
    }
    if(check == "minus"){
        for(let i = 0; i < this.player.length; i++){
            if(this.player[i].id === id&& this.player[i].score>0){        
                    this.player[i].score--
                    localStorage.setItem("playerData", JSON.stringify(this.player))
                    this.renderPlayer()
                    break
            }
        }
    }
   }
}
let player = new Player()
player.renderPlayer()


function adding(){
    player.createPlayer()
    player.renderPlayer()
    displayP();
}


function del(id:number){
    player.deletePlayer(id)
    player.renderPlayer()
    displayP();
    displayM()
}

function add(id:number){
    let check = "add"
    player.updatePlayer(id,check)
    displayM()
}

function minus(id:number){
    let check = "minus"
    player.updatePlayer(id,check)
    displayM()
}

function displayP():void{
    let data:null|string = localStorage.getItem("playerData");
    if(data){
        let playerList = JSON.parse(data);
        (<HTMLInputElement>document.getElementById("count")).innerHTML = playerList.length;
    }else{
        (<HTMLInputElement>document.getElementById("count")).innerHTML = ``;
    }
}
displayP();

function displayM():void{
    let sum = 0
    let data:null|string|[] = localStorage.getItem("playerData");
    if(data){
        let playerInfo = JSON.parse(data);
        for(let i = 0 ; i<playerInfo.length;i++){
            sum+=player.player[i].score;
        }
        (<HTMLInputElement>document.getElementById("point")).innerHTML="";
        (<HTMLInputElement>document.getElementById("point")).innerHTML=`${sum}`;
    }
}
displayM()