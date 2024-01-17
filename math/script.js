function findCosine(vLength, angle) {
    return vLength*Math.cos(angle*2*Math.PI/360);
}

function findSine(vLength, angle) {
    return vLength*Math.sin(angle*2*Math.PI/360);
}

function addComponents(v1Component, v2Component) {
    return v1Component+v2Component;
}

function calculate() {
    let V1VectorLength=document.getElementById('V1VectorLength').value;
    let V1AngleMeasurement=document.getElementById('V1AngleMeasurement').value;
    let V2VectorLength=document.getElementById('V2VectorLength').value;
    let V2AngleMeasurement=document.getElementById('V2AngleMeasurement').value;

    let v1Cosine=findCosine(V1VectorLength, V1AngleMeasurement);
    let v1Sine=findSine(V1VectorLength, V1AngleMeasurement);
    let v2Cosine=findCosine(V2VectorLength, V2AngleMeasurement);
    let v2Sine=findSine(V2VectorLength, V2AngleMeasurement);

    let finalXValue=addComponents(v1Cosine, v2Cosine);
    let finalYValue=addComponents(v1Sine,v2Sine);

    document.getElementById('answer').innerText =`${finalXValue.toFixed(2)}R + ${finalYValue.toFixed(2)}U`;
}


