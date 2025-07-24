function calculate() {
    let answer;
    let i;
    let pieceType=document.getElementById('pieceType').value;
    let dmgDone=document.getElementById('dmgDone').value;
    let units = [
        {hpu: 4, dpu: 2, numUnits: 16, totalHp: 64},
        {hpu: 3, dpu: 2, numUnits: 16, totalHp: 48},
        {hpu: 1, dpu: 1, numUnits: 16, totalHp: 16},
        {hpu: 12, dpu: 8, numUnits: 4, totalHp: 48},
        {hpu: 40, dpu: 32, numUnits: 1, totalHp: 40}
    ];

    if (pieceType == "swordsman" || pieceType == "axeOrc"){
        i = 0;
    } else if (pieceType == "spearman" || pieceType == "spearOrc") {
        i = 1;
    } else if (pieceType == "archer" || pieceType == "crossbowOrc") {
        i = 2;
    } else if (pieceType == "cavalry" || pieceType == "wolfOrc") {
        i = 3;
    } else if (pieceType == "cannon" || pieceType == "troll") {
        i = 4;
    }

    answer = (`
        <b>Unit name:</b> ${pieceType} <br>
        <b>Hp per Unit:</b> ${units[i].hpu} <br>
        <b>Dmg per Unit:</b> ${units[i].dpu} <br>
        <b>Number of soldiers in piece:</b> ${Math.max(0,Math.ceil((units[i].totalHp - dmgDone) / units[i].hpu))} <br>
        <b>Total Hp of piece:</b> ${Math.max(0,units[i].totalHp - dmgDone)}
    `)
    document.getElementById('answer').innerHTML = answer;
}
