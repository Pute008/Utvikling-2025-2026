// let array = [
//     'brannmann',
//     'politimann',
//     'koding',
//     'sykepleier'
// ]

// document.getElementById("form").addEventListener("submit", favorittHobby);

// function favorittHobby(event) {
//     event.preventDefault();
//     console.warn("Test")
// }

// // function favorittHobby(event) {
// //     event.preventDefault();
// //     let favorittHobby = document.getElementById("favorittHobby");
// //     if (favorittHobby) = array {
// //         console.log("test");
// //     }
// // }


const array = [1, 2, 3];

console.log(array.includes(2));
// Expected output: true







const favorittJob = ["brannmann", "politi", "programmerer"];



document.getElementById("favorittJobb").addEventListener("click", function(event) {
    event.preventDefault();
    let dinJob = prompt("Hva er favorittjobben din? ").toLocaleLowerCase();

    if (favorittJob.includes(dinJob)) {
        console.log("Jeg liker også å jobbe med " + dinJob);
    } else {
        console.log("Jeg liker noe annet");
    }
});

console.log(favorittJob.includes("brannmann"));
// Expected output: true

console.log(favorittJob.includes("politi"));
// Expected output: false
