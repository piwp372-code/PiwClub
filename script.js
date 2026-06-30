/* ==========================
   PIW CLUB TIERS
   SCRIPT.JS
========================== */

let currentMode = "sword";


/* ==========================
   HITUNG SCORE
========================== */

function getScore(player){

return player[currentMode];

}

/* ==========================
   TAMPILKAN RANKING
========================== */

function renderRanking(){

const list=document.getElementById("rankingList");

const search=document.getElementById("search").value.toLowerCase();

list.innerHTML="";

const sorted=[...players]

.filter(player=>player.name.toLowerCase().includes(search))

.sort((a,b)=>getScore(b)-getScore(a));

sorted.forEach((player,index)=>{

list.innerHTML += `

<div class="player-card">

<div class="left">

<div class="rank-number rank${index+1}"> #${index+1}
</div>

<img class="skin" src="${player.skin}">

<div class="player-info">

<h3>${player.name}</h3>

<div class="device">

<img src="${player.deviceIcon}">

<span>${player.device}</span>

</div>

</div>

</div>

<div class="score">
${getScore(player)}
</div>

</div>

`;

});

document.getElementById("playerCount").innerText=players.length;

}

/* ==========================
   SEARCH
========================== */

document.getElementById("search")

.addEventListener("input",renderRanking);

/* ==========================
   FILTER MODE
========================== */

document.getElementById("sword").onclick=()=>{

currentMode="sword";

renderRanking();

};

document.getElementById("mace").onclick=()=>{

currentMode="mace";

renderRanking();

};

document.getElementById("elymace").onclick=()=>{

currentMode="elymace";

renderRanking();

};

/* ==========================
   BUTTON
========================== */

document.getElementById("discordBtn").onclick=function(){

window.open("https://chat.whatsapp.com/FerGP01C8eMCVkedr0u3IP");

};

document.getElementById("rankingBtn").onclick=function(){

document.querySelector(".ranking-section")

.scrollIntoView({

behavior:"smooth"

});

};

/* ==========================
   START
========================== */

renderRanking();

function editPlayer(name,data){

const player=players.find(
p=>p.name===name
);

if(!player) return;

Object.assign(player,data);

renderRanking();

}

function addScore(name,mode,score){

const player=players.find(
p=>p.name===name
);

if(!player) return;

player[mode]+=score;

renderRanking();

}

function removePlayer(name){

const index=players.findIndex(
p=>p.name===name
);

if(index!=-1){

players.splice(index,1);

renderRanking();

}

}