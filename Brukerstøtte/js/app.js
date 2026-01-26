let cart = [];

function addToCart(item) {
    cart.push(item);
    alert(item + " ble lagt i handlekurven!");
    console.log("Handlekurv:", cart);
}

// Eksempel: validering av kontaktformular
document.getElementById('kontaktSkjema').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Takk for meldingen!");
});
