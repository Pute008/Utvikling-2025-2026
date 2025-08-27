
document.getElementById("form").addEventListener("submit", differanse);

function differanse(event) {
    event.preventDefault();
    let sted1 = document.getElementById("sted1").value;
    let sted2 = document.getElementById("sted2").value;

    let stedforskjell = Math.abs(parseInt(sted1.length) - parseInt(sted2.length))
    document.getElementById("text").innerHTML = stedforskjell;
}
