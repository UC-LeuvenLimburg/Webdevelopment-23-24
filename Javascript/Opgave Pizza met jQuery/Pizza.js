$(document).ready(function(){

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
// -- Deelopgave 1 -- //
//De functie addItemToSelect voegt een option toe aan de select
// met als inhoud de optionName toe
// aan een select met het id van selectName
function addItemToSelect(selectName, optionName){

}

//De functie addList vult de 2 lijsten met: 
// - de pizza's die in het object pizzas zitten
// - de ingrediënten die in de array ingredienten zitten
function addList() {
	for (let pizza in pizzas) {
		console.log(pizzas[pizza]);
		addItemToSelect("pizzaLijst", pizza);
	}

	for (let ingredient of ingredienten){
		console.log(ingredient);
		addItemToSelect("ingredientenLijst", ingredient);
	}
}

// -- Deelopgave 4 -- //
// De functie berekent het totaal en past het aan in het winkemandje
function updateTotaal(){

}

// -- Deelopgave 4 en 5 -- //
// De functie addRowToWinkelmandje voegt een rij toe aan het winkelmandje
// De rij bestaat uit de prijs, de naam, subtotaal en 3 knoppen
// Aan de knoppen wordt ook een event gehangen.
function addRowToWinkelmandje(naam){
	// Voeg rij toe aan winkelmandje
	// -- Deelopgave 5 -- //
	// Maak 3 knoppen aan

	// Maak buttongroup aan

	
	// Voeg knoppen toe aan buttongroup

	// Maak kolom aan
	
	// Voeg buttongroup toe aan kolom
	
	// Voeg kolom met buttongroup toe aan rij
	
	// Voeg het attribuut type met waarde button toe aan de knoppen + voeg de klasse btn btn-info toe aan de knoppen

	// -- Deelopgave 6 -- //
	// De add knopt voegt 1 pizza toe van deze pizzanaam
		
	// De remove knopt verwijdert 1 pizza van deze pizzanaam
	
	// De delete knop verwijdert alle pizzas van deze pizzanaam

}

// -- Deelopgave 7 -- //
// Deze functie removeRowFromWinkelmandje verwijdert de volledige rij
// om geen geheugen lekken te hebben worden ook de events van de knoppen verwijdert.
function removeRowFromWinkelmandje(naam){

}

// -- Deelopgave 4 -- //
// Deze functie updateRowWinkelmandje past het aantal pizzas en subtotaal van een rij aan.
function updateRowWinkelmandje(naam){

}

// --EVENTS-- //
// -- Deelopgave 2 -- //
// Wanneer we de pizzalijst wijzigen of met andere woorden
// een pizza in de lijst aangeduid wordt 
// tonen we de details van deze pizza
	//event function()
	/*let pizza =
	
	if (!pizzas[pizza]){
		alert("Geen pizzas beschikbaar!");
	}else{
		// Toon pizza
 		// Toon "Prijs: " + pizzas[pizza].prijs + "€<br>"
		// Voeg toe "Ingrediënten: " + pizzas[pizza].ingredienten.join(", ")
	}
	*/

// -- Deelopgave 3 -- //
// Wanneer de knop Bestel Pizza gedrukt wordt
// controleren we of alle verlden ingevuld werd voordat 
// we een pizza kunnen toevoegen aan het object winkelmandje
// en het winkelmandje tonen
// Wanneer de pizza al in winkelmandje zit, passen we de gegevens aan
	//event function()
	//Lees aantal
	/*let aantal = 
	//Lees de geselecteerd pizza
	let pizza =
	// Controleer of aantal een positief getal is 
	if (isNaN(aantal) || aantal <= 0) {
		alert("Vul het aantal pizzas dat je wilt bestellen in.");
	//Controleer of de geselecteerde pizza bestaat 
	} else if (!pizzas[pizza]) {
		alert("Selecteer de pizza die je wil bestellen.");
	} else {
		// zit deze pizza al in het winkelmandje?
		if (winkelmandje[pizza]) {
			// dan tellen we het eerder toegevoegde aantal erbij
			aantal += winkelmandje[pizza].aantal;
			winkelmandje[pizza] = { aantal: aantal, naam: pizza, kostprijs: pizzas[pizza].prijs * aantal }
			// en updaten we het winkelmandje
			updateRowWinkelmandje(pizza);
			updateTotaal();
		} else {
			// dan voegen we de pizza toe aan het winkelmandje
			winkelmandje[pizza] = { aantal: aantal, naam: pizza, kostprijs: pizzas[pizza].prijs * aantal }
			addRowToWinkelmandje(pizza);
			updateTotaal();
		}
	}
*/

// -- Deelopgave 8 -- //
// Wanneer de knop Add extra Pizza gedrukt wordt
// controleren we of alle verlden ingevuld werd voordat 
// we een nieuwe pizza samenstellen
// en deze toevoegen aan het object pizzas
// en tonen in de selectielijst
    //event function(){
	//Lees de ingevulde naam en prijs
	/*let pizzaNaam =
	let pizzaPrijs =
	let selectedIngredienten = [];
	
	
	//Controleer de ingave
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
*/

// -- Deelopgave 8 -- //
// Wanneer de knop Add extra ingrediënt gedrukt wordt
// voegen we dit toe aan de array ingredients
// en tonen deze in de selectielijst
	// event function(){
	/*let nieuwIngredient = 
	
	if (nieuwIngredient.length <= 0) {
		alert("Geef een ingrediënten naam in!");
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
*/

});