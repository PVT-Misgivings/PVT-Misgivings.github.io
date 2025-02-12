function calculate() {
    let pointX=document.getElementById('pointX').value;
    let pointY=document.getElementById('pointY').value;
    let magnitude=document.getElementById('Magnitude').value;
    let yIntercept=document.getElementById('Y-intercept').value;
    let negNewMag = 1/magnitude;
    let newB = pointY + (negNewMag*pointX);
    let newX = (newB + yIntercept) / (magnitude + negNewMag);
    let newY = magnitude*newX + yIntercept;

    let answer = Math.sqrt(((pointX-newX)**2) + ((pointY-newY)**2));
    document.getElementById('answer').innerHTML =answer;

}

