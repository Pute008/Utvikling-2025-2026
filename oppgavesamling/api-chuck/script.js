// async function hentData(){
//     let response = await fetch('https://cataas.com/cat/cute/says/hello');
//     // let response = await fetch("https://api.chucknorris.io/jokes/random");
//     // let data = await response.json();
//     // console.log("Alle data:");
//     // console.log(data);
//     // console.log("\nBare vitsen:");
//     // console.log(data.value)
//     const bilde = document.createElement('img')
//     bilde.src = response
//     document.body.appendChild(bilde)

// }

// hentData();

function hentKatt () {
    const bilde = document.createElement("img");
    bilde.src = 'https://cataas.com/cat/cute/says/helloh';
    document.body.appendChild(bilde)
}

hentKatt()