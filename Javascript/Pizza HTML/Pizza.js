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

var winkelmandje = [];

function addItemToSelect(idName, text){
    let option = document.createElement("option");
    option.innerHTML = text;
    document.getElementById(idName).appendChild(option); 
}


function addList(){
    for (pizza in pizzas){
        console.log(pizzas[pizza]);
        // console.log(pizzas[pizza].naam);
        // console.log(pizzas[pizza]["naam"]);
        addItemToSelect("pizzaLijst", pizza);
    } 
}

addList();

document.getElementById("pizzaLijst").addEventListener("change", function(){
    let pizza = document.getElementById("pizzaLijst").value;
    console.log(pizzas[pizza].prijs);
    document.getElementById("showPizzaName").innerHTML = pizza.toUpperCase();
    document.getElementById("showPizzaDetails").innerHTML = "Prijs: " + pizzas[pizza].prijs + "€<br>";
    document.getElementById("showPizzaDetails").innerHTML += "Indrediënten: " + pizzas[pizza].ingredienten.join(", ");
});

document.getElementById("orderPizza").addEventListener("click", function(){
    let aantal = +document.getElementById("aantal").value; 
    let pizza = document.getElementById("pizzaLijst").value;
    if (isNaN(aantal) || aantal <= 0)  {
        alert("Geef een positief aantal in.");
    } else if (pizza == undefined || pizza == "") {
          alert("Duid een pizza aan.");
    } else {
        winkelmandje[pizza] = {aantal: aantal, kostprijs: pizzas[pizza].prijs*aantal}
        console.log(winkelmandje);
    }
})
