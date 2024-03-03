let phaserScene;
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
    
    let scale = 25/[v1Cosine,v1Sine,v2Cosine,v2Sine,finalXValue,finalYValue].map(Math.abs).reduce((acc, n) => acc = Math.max(acc, n), 0);

    let finalLength = Math.sqrt(finalXValue**2 + finalYValue**2);

    let finalAngle = Math.atan(finalYValue/finalXValue) * 180;

    phaserScene.clearLines();
    document.getElementById('answer').innerHTML =`${finalXValue.toFixed(2)}R ${(finalYValue >= 0)?'+':'-'} ${Math.abs(finalYValue).toFixed(2)}U`
        + '<BR>'
        + `${finalLength.toFixed(2)}∠${finalAngle.toFixed(2)}°`;

    phaserScene.drawLine(0, 0, v1Cosine*scale, v1Sine*scale, 0x0000FF);
    phaserScene.drawLine(0, 0, v2Cosine*scale, v2Sine*scale, 0xFF0000);
    phaserScene.moveTo(phaserScene.drawLine(0, 0, v1Cosine*scale, v1Sine*scale, 0x0000AA), v2Cosine*scale, v2Sine*scale, finalXValue*scale, finalYValue*scale);
}

class Example extends Phaser.Scene {
    lines = [];
    sf = 10;
    constructor() { 
        super();
        phaserScene = this;
    }

    clearLines() {
        this.lines.forEach(line => {
            line.destroy();
        });
        this.lines = [];
    }

    drawAxes() {
        this.add.line(0, 0, -100*this.sf, 0*this.sf, 100*this.sf, 0*this.sf, 0x000000, .5).setOrigin(0);
        this.add.line(0, 0, 0*this.sf, -100*this.sf, 0*this.sf, 100*this.sf, 0x000000, .5).setOrigin(0);
    }

    preload () {
        //this.cameras.main.setZoom(1);
        this.cameras.main.pan(0, 0, 0);
        this.drawAxes();
    }

    create () {
    }

    drawLine(x1, y1, x2, y2, color) {
        let line = this.add.line(0, 0, x1*this.sf, -y1*this.sf, x2*this.sf, -y2*this.sf, color, 0.5).setOrigin(0).setName('line');
        this.lines.push(line);
        return line;
    }

    moveTo(line1, x, y, xf, yf) {
        this.tweens.add({
            targets: line1,
            x: this.sf*x,
            y: this.sf*-y,
            ease: 'Linear',
            repeat: 0,
            duration: 2000,
            onComplete: _ => {
                let line = this.add.line(0, 0, 0, 0, xf*this.sf, -yf*this.sf, 0xFFFFFF).setOrigin(0).setName('Result');
                this.lines.push(line);
                line1.destroy();
                this.lines = this.lines.filter(aLine => aLine !== line1);
                line = this.add.line(0, 0, 0, 0, xf*this.sf, 0, 0xFFFFFF).setOrigin(0);
                this.lines.push(line);
                line = this.add.line(xf*this.sf, 0, 0, 0, 0, -yf*this.sf, 0xFFFFFF).setOrigin(0);
                this.lines.push(line);
            }
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example,
    backgroundColor: 0x4488aa,
};

const game = new Phaser.Game(config);