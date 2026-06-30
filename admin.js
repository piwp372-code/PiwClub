/* ==========================
   PIW CLUB ADMIN
   ADMIN.JS
========================== */

let lastSavedData = "";

/* ==========================
   LOGOUT
========================== */

function logout(){

location.reload();

}

/* ==========================
   TAMBAH SCORE
========================== */

function addScore(id, mode){

    const player = players.find(p => p.id === id);

    if(player){

        player[mode]++;

        document.getElementById(`${mode}-${id}`).textContent = player[mode];

checkChanges();

    }

}

/* ==========================
   KURANG SCORE
========================== */

function removeScore(id, mode){

    const player = players.find(p => p.id === id);

    if(player){

        player[mode]--;

        if(player[mode] < 0){
            player[mode] = 0;
        }

        document.getElementById(`${mode}-${id}`).textContent = player[mode];

checkChanges();

    }

}

function getMedal(index){

    if(index === 0) return "🥇";

    if(index === 1) return "🥈";

    if(index === 2) return "🥉";

    return "🏅";

}

function renderRanking(){

    const box =
    document.getElementById("rankingList");

    box.innerHTML="";

    const sorted=[...players].sort((a,b)=>{

        return (
            b.sword+b.mace+b.elymace
        )-
        (
            a.sword+a.mace+a.elymace
        );

    });

    sorted.forEach((player,index)=>{

        const total=
        player.sword+
        player.mace+
        player.elymace;

box.innerHTML += `

<div class="rank-card">

<div class="rank-header">

<div class="player-profile">

<img class="rank-skin" src="${player.skin}">

<div>

<h3>${getMedal(index)} #${index+1}</h3>

<h4>${player.name}</h4>

<span class="device">${player.device}</span>

</div>

</div>

</div>

<div class="stats">

<div>

<span class="stat-icon3">⚔</span>

<b>${player.sword}</b>

</div>

<div>

<img src="mace.png" class="stat-icon2">

<b>${player.mace}</b>

</div>

<div>

<img src="elytra.png" class="stat-icon2">

<b>${player.elymace}</b>

</div>

</div>

<div class="total">
    <div class="total-label">
        <img src="rank.png" class="stat-icon4">
        <span>Total Score</span>
    </div>

    <span>${total}</span>
</div>

</div>

`;

    });

}

/* ==========================
   SEARCH
========================== */

function renderAdmin(){

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const box = document.getElementById("adminPlayers");

    box.textContent = "";

    const fragment = document.createDocumentFragment();

    players
        .filter(player =>
            player.name.toLowerCase().includes(keyword)
        )
        .forEach(player => {

            const card = document.createElement("div");

            card.className = "card";

            card.innerHTML = `
<div class="player">

<div class="player-left">

<img src="${player.skin}">

<div class="player-info">

<h3>${player.name}</h3>

<span>${player.device}</span>

</div>

</div>

<div>

<div class="score">

⚔ <span id="sword-${player.id}">${player.sword}</span>

<button class="plus" onclick="addScore(${player.id},'sword')">+</button>

<button class="minus" onclick="removeScore(${player.id},'sword')">-</button>

</div>

<br>

<div class="score">

<img src="mace.png" class="stat-icon">

<span id="mace-${player.id}">
    ${player.mace}
</span>

<button class="plus" onclick="addScore(${player.id},'mace')">+</button>

<button class="minus" onclick="removeScore(${player.id},'mace')">-</button>

</div>

<br>

<div class="score">

<img src="elytra.png" class="stat-icon">

<span id="elymace-${player.id}">
    ${player.elymace}
</span>

<button class="plus" onclick="addScore(${player.id},'elymace')">+</button>

<button class="minus" onclick="removeScore(${player.id},'elymace')">-</button>

</div>

</div>

</div>
`;

            fragment.appendChild(card);

        });

    box.appendChild(fragment);

}

/* ==========================
   SEARCH EVENT
========================== */

console.log(players);

document
.getElementById("search")
.addEventListener(
    "input",
    renderAdmin
);

/* ==========================
   LOGOUT BUTTON
========================== */

/* ==========================
   START
========================== */

const saved = localStorage.getItem("players");

if (saved) {

    const savedPlayers = JSON.parse(saved);

    // Update data player yang sudah ada
    savedPlayers.forEach(savedPlayer => {

        const player = players.find(p => p.id === savedPlayer.id);

        if (player) {

            player.sword = savedPlayer.sword;
            player.mace = savedPlayer.mace;
            player.elymace = savedPlayer.elymace;

        }

    });

    // Tambahkan player lama yang tidak ada di player.js
    savedPlayers.forEach(savedPlayer => {

        if (!players.find(p => p.id === savedPlayer.id)) {

            players.push(savedPlayer);

        }

    });

}

lastSavedData = JSON.stringify(players);

checkChanges();

renderAdmin();

document.getElementById("totalPlayer").textContent = players.length;

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("overlay");

menuBtn.onclick = function(e){

    e.stopPropagation();

    sidebar.classList.add("show");
    overlay.classList.add("show");

};

overlay.onclick = function(){

    sidebar.classList.remove("show");
    overlay.classList.remove("show");

};

const dashboardBtn = document.getElementById("dashboardBtn");
const playersBtn = document.getElementById("playersBtn");
const rankingsBtn =
document.getElementById("rankingsBtn");

const dashboardPage = document.getElementById("dashboardPage");
const playersPage = document.getElementById("playersPage");
const rankingsPage =
document.getElementById("rankingsPage");

dashboardBtn.onclick = function(){

    dashboardPage.style.display = "block";
    playersPage.style.display = "none";

    rankingsPage.style.display="none";

    dashboardBtn.classList.add("active");
    playersBtn.classList.remove("active");

}

playersBtn.onclick = function(){

    dashboardPage.style.display = "none";
    playersPage.style.display = "block";
    rankingsPage.style.display="none";

    dashboardBtn.classList.remove("active");
    playersBtn.classList.add("active");

    renderAdmin();

}

rankingsBtn.onclick=function(){

    dashboardPage.style.display="none";

    playersPage.style.display="none";

    rankingsPage.style.display="block";

    dashboardBtn.classList.remove("active");

    playersBtn.classList.remove("active");

    rankingsBtn.classList.add("active");

    renderRanking();

}

function savePlayers(){

    localStorage.setItem(
        "players",
        JSON.stringify(players)
    );

    lastSavedData = JSON.stringify(players);

    checkChanges();

    alert("Data berhasil disimpan!");

}

document
.querySelector(".logout")
.addEventListener(
    "click",
    logout
);

document
.querySelector(".save")
.addEventListener(
    "click",
    savePlayers
);

function checkChanges(){

    const saveBtn = document.querySelector(".save");

    const changed =
        JSON.stringify(players) !== lastSavedData;

    saveBtn.style.display =
        changed ? "block" : "none";

}