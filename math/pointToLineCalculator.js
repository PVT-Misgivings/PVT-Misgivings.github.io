function calculate() {
    let pointX=parseFloat(eval(document.getElementById('pointX').value));
    let pointY=parseFloat(eval(document.getElementById('pointY').value));
    let magnitude=parseFloat(eval(document.getElementById('Magnitude').value));
    let yIntercept=parseFloat(eval(document.getElementById('YIntercept').value));
    let newMag = -1/magnitude;
    let newB = pointY - (newMag*pointX);
    let newX = (newB - yIntercept) / (magnitude - newMag);
    let newY = magnitude*newX + yIntercept;

    let answer = Math.sqrt(((pointX-newX)**2) + ((pointY-newY)**2));
    document.getElementById('answer').innerHTML =answer;

}


