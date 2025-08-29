let array = [
    'brannmann',
    'politimann',
    'koding',
    'sykepleier'
]

document.getElementById("form").addEventListener("submit", favorittHobby);

function favorittHobby(event) {
    event.preventDefault();
    let favorittHobby = document.getElementById("favorittHobby");
    if (favorittHobby) = array {
        console.log("test");
    }
}