const overskrift = document.createElement("h1");
overskrift.innerText = "Dette er min overskrift.";
document.body.appendChild(overskrift);

const button1 = document.createElement("button");
button1.innerHTML = "Trykk her"
button1.id = "button1";
button1.addEventListener("click", trykk1)
document.body.appendChild(button1);

function trykk1(evt) {
    console.log(evt.target.id);
    // console.log("HEI 1");
    if (evt.target.id === "button3") {
        document.body.style.backgroundColor = "black"
        document.body.style.color = "white"
    } else {
        document.body.style.backgroundColor = "white"
        document.body.style.color = "black"
    }
}

const button2 = document.createElement("button");
button2.innerHTML = "Trykk her"
button2.id = "button2";
button2.addEventListener("click", trykk1)
document.body.appendChild(button2);


const button3 = document.createElement("button");
button3.innerHTML = "Trykk her"
button3.id = "button3";
button3.addEventListener("click", trykk1)
document.body.appendChild(button3);
