function create() {
    //Tribes have 5 different characteristics that determine how they act: size, aggression, productivity, paranoia, and bounty.
    let size = Math.round(Math.random() * 2 + 1);
    let aggression = Math.round(Math.random() * 2);
    let productivity = Math.round(Math.random() * 3);
    let paranoia = Math.round(Math.random() * 9 + 1);
    let bounty = size+aggression+productivity+2;


    result = (`
        <b>SIZE:</b> ${size} <br>
        <b>AGGRESSION:</b> ${aggression} <br>
        <b>PRODUCTIVITY:</b> ${productivity} <br>
        <b>PARANOIA:</b> ${paranoia} <br>
        <b>BOUNTY:</b> ${bounty}
    `)

    document.getElementById('result').innerHTML = result;

}