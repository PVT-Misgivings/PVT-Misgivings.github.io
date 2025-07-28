//Document.gets
let dropdown = document.getElementById("existPieces");

//Arrays
let piecesNames = [];
let piecesText = [];
let units = [
    {type: "sword", hpu: 4, dpu: 2, numUnits: 16, totalHp: 64},
    {type: "spear", hpu: 3, dpu: 2, numUnits: 16, totalHp: 48},
    {type: "ranged", hpu: 1, dpu: 1, numUnits: 16, totalHp: 16},
    {type: "rider", hpu: 12, dpu: 8, numUnits: 4, totalHp: 48},
    {type: "tank", hpu: 40, dpu: 32, numUnits: 1, totalHp: 40}
];

//Vars
let i;


function addPiece() {
    existPieces.innerHTML = "";
    let pieceType = document.getElementById('pieceType').value;
    let newPiece = {};

    if (pieceType == "Swordsman" || pieceType == "Axe Orc"){i = 0;} 
    else if (pieceType == "Spearman" || pieceType == "Spear Orc"){i = 1;} 
    else if (pieceType == "Archer" || pieceType == "Crossbow Orc"){i = 2;} 
    else if (pieceType == "Cavalry" || pieceType == "Wolf rider"){i = 3;} 
    else if (pieceType == "Cannon" || pieceType == "Troll"){i = 4;}

    newPiece = {
        name: pieceType,
        text: `<b>Unit name:</b> ${pieceType} <br>
        <b>Hp per Unit:</b> ${units[i].hpu} <br>
        <b>Dmg per Unit:</b> ${units[i].dpu} <br>
        <b>Number of soldiers in piece:</b> ${units[i].numUnits} <br>
        <b>Total Hp of piece:</b> ${units[i].totalHp}`
    }
    piecesNames.push(newPiece.name);
    piecesText.push(newPiece.text);

    //Dynamically updating existPiece dropdown to contain all exisiting pieces
    for (let optionText of piecesNames) {
        let option = document.createElement("option");
        option.value = optionText.toLowerCase();  // value sent on form submit
        option.textContent = optionText;          // what the user sees
        existPieces.appendChild(option);
    }

    document.getElementById('pieces').innerHTML = piecesText.join("<br><br>");;
}

function calculate() {
    let existingPiece = document.getElementById('existPieces').value;
    let answer;
    let dmgDone=document.getElementById('dmgDone').value;

    answer = (`
        <b>Unit name:</b> ${pieceType} <br>
        <b>Hp per Unit:</b> ${units[i].hpu} <br>
        <b>Dmg per Unit:</b> ${units[i].dpu} <br>
        <b>Number of soldiers in piece:</b> ${Math.max(0,Math.ceil((units[i].totalHp - dmgDone) / units[i].hpu))} <br>
        <b>Total Hp of piece:</b> ${Math.max(0,units[i].totalHp - dmgDone)}
    `)
    document.getElementById('answer').innerHTML = answer;
}