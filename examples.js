function clickIt() {
    alert('hi');
}

function showInput1() {
    alert(document.getElementById('input1').value);
}

function setInput2() {
    document.getElementById('input2').value = document.getElementById('input1').value;
}

function setDiv1() {
    document.getElementById('div1').innerText = document.getElementById('input1').value;
}

console.log('The javascript has been loaded!');