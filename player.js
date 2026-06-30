/* ==========================
   PIW CLUB TIERS
   PLAYERS.JS
========================== */

const players = [];

/* ==========================
   TAMBAH PEMAIN
========================== */

/* ==========================
   DATA PEMAIN
========================== */

addPlayer("FanyMutia","Mobilator","fany.png",0,0,0);
addPlayer("bqnxXD","Mobile","steve.png",0,0,0);
addPlayer("DASTHEREE","Desktop","steve.png",0,0,0);
addPlayer("XxRxikyxX","Mobile","steve.png",0,0,0);

function addPlayer(name, device, skin, sword, mace, elymace){

    players.push({

        id: players.length + 1,

        name,
        device,
        skin,

        deviceIcon:
            device === "Desktop"
            ? "desktop.png"
            : "mobile.png",

        sword,
        mace,
        elymace

    });

}

