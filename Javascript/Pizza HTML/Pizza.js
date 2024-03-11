var pizzas = {
    "margherita": {
        // naam: "margherita",
        prijs: 10,
        ingredienten: ["tomatensaus", "mozerella"]
    },
    hawai: {
        // naam: "hawai",
        prijs: 12,
        ingredienten: ["tomatensaus", "mozerella", "hesp", "ananas"]
    }
}

var ingredienten = ["tomatensaus", "mozerella", "hesp", "ananas"];

var winkelmandje = {};

function addItemToSelect(idName, text) {
    let option = document.createElement("option");
    option.innerHTML = text;
    document.getElementById(idName).appendChild(option);
}


function addList() {
    for (pizza in pizzas) {
        console.log(pizzas[pizza]);
        // console.log(pizzas[pizza].naam);
        // console.log(pizzas[pizza]["naam"]);
        addItemToSelect("pizzaLijst", pizza);
    }

    for (ingredient of ingredienten){
        console.log(ingredient);
        addItemToSelect("ingredientenLijst", ingredient);
    }
}

addList();

document.getElementById("pizzaLijst").addEventListener("change", function () {
    let pizza = document.getElementById("pizzaLijst").value;
    console.log(pizzas[pizza].prijs);
    document.getElementById("showPizzaName").innerHTML = pizza.toUpperCase();
    document.getElementById("showPizzaDetails").innerHTML = "Prijs: " + pizzas[pizza].prijs + "€<br>";
    document.getElementById("showPizzaDetails").innerHTML += "Indrediënten: " + pizzas[pizza].ingredienten.join(", ");
});

document.getElementById("orderPizza").addEventListener("click", function () {
    let aantal = +document.getElementById("aantal").value;
    let pizza = document.getElementById("pizzaLijst").value;
    if (isNaN(aantal) || aantal <= 0) {
        alert("Geef een positief aantal in.");
    } else if (pizza == undefined || pizza == "") {
        alert("Duid een pizza aan.");
    } else {
        if (winkelmandje[pizza]) {
            aantal += winkelmandje[pizza].aantal;
        }
        winkelmandje[pizza] = { aantal: aantal, naam: pizza, kostprijs: pizzas[pizza].prijs * aantal }
        console.log(winkelmandje);
        toonWinkelmandje();
    }
})

function toonWinkelmandje() {
    let tabel = document.getElementById("winkelmandje");
    let totaalRij = document.getElementById("totaalrij");
    while (tabel.children.length > 2) {
        tabel.removeChild(tabel.children[1]);
    }

    var totaal = 0;
    for (let pizzaRij in winkelmandje) {
        console.log(pizzaRij);
        let rij = document.createElement("tr");
        for (let pizzaCel in winkelmandje[pizzaRij]) {
            console.log(pizzaCel);
            let cel = document.createElement("td");
            cel.innerHTML = winkelmandje[pizzaRij][pizzaCel];
            rij.appendChild(cel);
        }

        tabel.insertBefore(rij, totaalRij); 
    
        totaal += winkelmandje[pizzaRij].kostprijs;     
    }
    document.getElementById("totaal").innerHTML = totaal;
}
