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

    document.getElementById('answer').innerText =`${finalXValue.toFixed(2)}R + ${finalYValue.toFixed(2)}U`;

    let l1 = phaserScene.drawLine(0, 0, v1Cosine, v1Sine, 0x0000FF);
    let l2 = phaserScene.drawLine(0, 0, v2Cosine, v2Sine, 0xFF0000);
    phaserScene.moveTo(phaserScene.drawLine(0, 0, v1Cosine, v1Sine, 0xFFFFFF), v2Cosine, v2Sine, finalXValue, finalYValue);
}

class Example extends Phaser.Scene {
    sf = 10;
    constructor() { 
        super();
        phaserScene = this;
    }

    preload () {
        this.cameras.main.setZoom(.5);
        this.cameras.main.pan(0, 0, 0);
        this.add.line(0, 0, -100*this.sf, 0*this.sf, 100*this.sf, 0*this.sf, 0x000000, .5).setOrigin(0);
        this.add.line(0, 0, 0*this.sf, -100*this.sf, 0*this.sf, 100*this.sf, 0x000000, .5).setOrigin(0);
    }

    create () {
    }

    drawLine(x1, y1, x2, y2, color) {
        return this.add.line(0, 0, x1*this.sf, -y1*this.sf, x2*this.sf, -y2*this.sf, color, 0.5).setOrigin(0);
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
                this.add.line(0, 0, 0, 0, xf*this.sf, -yf*this.sf, 0xFFFFFF).setOrigin(0)
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