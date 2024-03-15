// Pizzas, Ingrediënten en winkelmandje zijn globale objecten (gebruik var)
// zo zijn ze eigenlijk eigenschappen van de pagina
// We voegen al een paar pizza's en ingrediënten toe bij opstarten.
// Het winkelmandje is leeg bij opstarten. 
var pizzas = {
    "margherita": {
        // naam: "margherita",
        prijs: 10,
        ingredienten: ["tomatensaus", "mozzarella"]
    },
    hawai: {
        // naam: "hawai",
        prijs: 12,
        ingredienten: ["tomatensaus", "mozzarella", "hesp", "ananas"]
    }
}

var ingredienten = ["tomatensaus", "mozzarella", "hesp", "ananas"];

var winkelmandje = {};

//We voeren bij opstarten de functie addList uit
//om bij opstarten de hierboven samengestelde pizzas en ingrediënten te tonen
addList();

// --FUNCTIES-- //
//De functie addItemToSelect voegt een option toe aan de select
// Het eerste argument is het id van de lijst.
// Het tweede argument is de tekst die toegevoegd moet worden
function addItemToSelect(idName, text) {
    let option = document.createElement("option");
    option.innerHTML = text;
    document.getElementById(idName).appendChild(option);
}

//De functie addList vult de 2 lijsten met: 
// - de pizza's die in het object pizzas zitten
// - de ingrediënten die in de array ingredienten zitten
function addList() {
    for (let pizza in pizzas) {
        console.log(pizzas[pizza]);
        // console.log(pizzas[pizza].naam);
        // console.log(pizzas[pizza]["naam"]);
        addItemToSelect("pizzaLijst", pizza);
    }

    for (let ingredient of ingredienten){
        console.log(ingredient);
        addItemToSelect("ingredientenLijst", ingredient);
    }
}

// De functie toonWinkelmandje
// een rij voor elke pizza in het globaal object winkelmandje.
// een rij bestaat uit meerder cellen afhankelijk van de eigenschappen van elke pizza in het object winkelmandje
// als laatste wordt de totaalprijs berekend en getoond
function toonWinkelmandje() {
    let tabel = document.getElementById("winkelmandje");
    let totaalRij = document.getElementById("totaalrij");

    // verwijder eerst de huidige info
	// de eerste en laatste rij mogen niet verwijdert worden
    while (tabel.children.length > 2) {
        tabel.removeChild(tabel.children[1]);
    }

    // initialiseer totaal voordat je het met de kostprijs van elke pizzarij verhoogt
    var totaal = 0;

    // voor elke pizza in het object winkelmandje
    for (let pizzaRij in winkelmandje) {
        console.log(pizzaRij);
        let rij = document.createElement("tr");
        // voor elke eigenschap in het object pizzaRij in winkelmandje
        for (let pizzaCel in winkelmandje[pizzaRij]) {
            console.log(pizzaCel);
            // maak een cel met de waarde van elke eigenschap van de pizzaRij
            let cel = document.createElement("td");
            cel.innerHTML = winkelmandje[pizzaRij][pizzaCel];
            // voeg de cel toe aan de rij
            rij.appendChild(cel);
        }
        // toon de rij voor de totaalrij
        tabel.insertBefore(rij, totaalRij); 
        // verhoog het totaal met de kostprijs van de pizzaRij
        totaal += winkelmandje[pizzaRij].kostprijs;     
    }
    // update het totaal
    document.getElementById("totaal").innerHTML = totaal;
}

// --EVENTS-- //
// Wanneer we de pizzalijst wijzigen of met andere woorden
// een pizza in de lijst aangeduid wordt 
// tonen we de details van deze pizza
document.getElementById("pizzaLijst").addEventListener("change", function () {
    let pizza = document.getElementById("pizzaLijst").value;
    				//this.options[this.selectedIndex].value;
	  				//omdat we maar 1 item selecteren in de lijst, 
	  				//geven beide hetzelfde
    console.log(pizzas[pizza].prijs);
    document.getElementById("showPizzaName").innerHTML = pizza.toUpperCase();
    document.getElementById("showPizzaDetails").innerHTML = "Prijs: " + pizzas[pizza].prijs + "€<br>";
    document.getElementById("showPizzaDetails").innerHTML += "Indrediënten: " + pizzas[pizza].ingredienten.join(", ");
});

// Wanneer de knop Bestel Pizza gedrukt wordt
// controleren we of alle verlden ingevuld werd voordat 
// we een pizza kunnen toevoegen aan het object winkelmandje
// en het winkelmandje tonen
// Wanneer de pizza al in winkelmandje zit, passen we de gegevens aan
document.getElementById("orderPizza").addEventListener("click", function () {
    let aantal = +document.getElementById("aantal").value;
    let pizza = document.getElementById("pizzaLijst").value;
    // let pizzalijst = document.getElementById("pizzaLijst")
    // let pizza = pizzalijst.options[pizzalijst.selectedIndex].value;
    if (isNaN(aantal) || aantal <= 0) {
        alert("Geef een positief aantal in.");
    } else if (pizza == undefined || pizza == "") {
    //} else if (!pizzas[pizza]) {
    //} else if (pizzalijst.selectedIndex <= -1){
        alert("Duid een pizza aan.");
    } else {
        // zit deze pizza al in het winkelmandje?
        if (winkelmandje[pizza]) {
            // dan tellen we het eerder toegevoegde aantal erbij
            aantal += winkelmandje[pizza].aantal;
        }
        // en voegen de pizza toe of passen de pizza aan
        winkelmandje[pizza] = { aantal: aantal, naam: pizza, kostprijs: pizzas[pizza].prijs * aantal }
        console.log(winkelmandje);
        toonWinkelmandje();
    }
})

// Wanneer de knop Add extra Pizza gedrukt wordt
// controleren we of alle verlden ingevuld werd voordat 
// we een nieuwe pizza samenstellen
// en deze toevoegen aan het object pizzas
// en tonen in de selectielijst
document.getElementById("addPizza").addEventListener("click", function() {
	let pizzaNaam = document.getElementById("pizzaName").value;
	let pizzaPrijs = +document.getElementById("pizzaPrijs").value;
    let selectedIngredienten = [];
    let selectedOptions = document.getElementById("ingredientenLijst").selectedOptions;
	for (let option of selectedOptions){
		selectedIngredienten.push(option.value);
	}
    // selectedIngredienten = Array.from(selectedOptions).map(option => option.value);

	// OF we nemen eerst alle opties uit de lijst en kijken dan voor elk item of het geselecteerd is
	// let ingredientenLijst = document.getElementById("ingredientenLijst").options;
	// for (ingredient of ingredientenLijst){
	// 	if (ingredient.selected){
	// 		selectedIngredienten.push(ingredient.value);
	// 	}
	// }

	if (pizzaNaam.length < 1 || isNaN(pizzaPrijs) || pizzaPrijs <= 0 || selectedIngredienten.length <= 0) {
		alert("De gegevens om een pizza toe te voegen zijn niet volledig of niet correct.");
	} else if(pizzas[pizzaNaam]){
		alert("Deze pizza bestaat al.");
	} else {
		pizzas[pizzaNaam] = {
			prijs: pizzaPrijs, 
			ingredienten: selectedIngredienten
			};
		addItemToSelect("pizzaLijst", pizzaNaam);
	}	
});

// Wanneer de knop Add extra ingrediënt gedrukt wordt
// voegen we dit toe aan de array ingredients
// en tonen deze in de selectielijst
document.getElementById("addIngredient").addEventListener("click", function() {
	let nieuwIngredient = document.getElementById("ingredient").value;
	
	if (nieuwIngredient.length <= 0){
		alert("Geef ingredient in.");
	} else {
		//controleer of het ingredient al bestaat
		var bestaatAl = false;
		for (let ingredient of ingredienten){
			if (nieuwIngredient == ingredient){
				alert("ingredient bestaat al");
				bestaatAl = true;
			}
		}

		if (!bestaatAl){
			ingredienten.push(nieuwIngredient);
			addItemToSelect("ingredientenLijst", nieuwIngredient);
		}
	}
});