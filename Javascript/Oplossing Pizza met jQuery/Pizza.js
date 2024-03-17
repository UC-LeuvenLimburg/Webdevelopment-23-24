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
	$("#"+selectName).append("<option>"+optionName+"</option>");
	/*var teller=0;
	for pizza in pizzas {
	teller +=1;
	}*/
	$("#pizzaLijst").attr("size", Object.keys(pizzas).length);

	$("#ingredientenLijst").attr("size", ingredienten.length);	

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
	var totaal = 0
	for (var pizza in winkelmandje){
		totaal += winkelmandje[pizza].kostprijs;
	}	
	$("#winkelmandje #totaal").html(totaal);
}

// -- Deelopgave 4 en 5 -- //
// De functie addRowToWinkelmandje voegt een rij toe aan het winkelmandje
// De rij bestaat uit de prijs, de naam, subtotaal en 3 knoppen
// Aan de knoppen wordt ook een event gehangen.
function addRowToWinkelmandje(naam){
	// Voeg rij toe aan winkelmandje
	$("#winkelmandje tr:last").before("<tr id='"+naam+"'><td class='aantal'>"+winkelmandje[naam].aantal+"</td><td>"+naam+"</td><td class='subtotaal'>"+winkelmandje[naam].kostprijs+"</td></tr>");

	// -- Deelopgave 5 -- //
	// Maak 3 knoppen aan 
	var addOneButton = $("<button id ='add"+naam+"'>+</button>");
	var removeOneButton = $("<button id ='remove"+naam+"'>-</button>");
	var deleteButton = $("<button id ='delete"+naam+"'>Delete</button>");
	
	// Maak buttongroup aan
	var buttonGroup = $("<div class='btn-group' role='group' aria-label='Add remove buttons'></div>");
	
	// Voeg knoppen toe aan buttongroup
	buttonGroup.append(addOneButton);
	buttonGroup.append(removeOneButton);
	buttonGroup.append(deleteButton);

	// Maak kolom aan
	var column= $("<td></td>");
	
	// Voeg buttongroup toe aan kolom
	column.append(buttonGroup);	

	// Voeg kolom met buttongroup toe aan rij
	$("#winkelmandje tr#"+naam).append(column);
	
	// Voeg het attribuut type met waarde button toe aan de knoppen + voeg de klasse btn btn-info toe aan de knoppen 
	$("#winkelmandje button").attr("type", "button");
	$("#winkelmandje button").addClass("btn");
	$("#winkelmandje button").addClass("btn-info");
	
	// -- Deelopgave 6 -- //
	// De add knopt voegt 1 pizza toe van deze pizzanaam
	$("#winkelmandje button#add"+naam).on("click", function(){
		let pizza = $(this).attr("id").slice(3);
		//console.log(pizza);
		winkelmandje[pizza].aantal++;
		winkelmandje[pizza].kostprijs = pizzas[pizza].prijs * winkelmandje[pizza].aantal;
		updateRowWinkelmandje(pizza);
		updateTotaal();
	});
	
	// De remove knopt verwijdert 1 pizza van deze pizzanaam
	$("#winkelmandje button#remove"+naam).on("click", function(){
		var pizza = $(this).attr("id").slice(6);
		//console.log(pizza);
		winkelmandje[pizza].aantal--;
		winkelmandje[pizza].kostprijs = pizzas[pizza].prijs * winkelmandje[pizza].aantal;

		if ((winkelmandje[pizza].aantal)<1){
			removeRowFromWinkelmandje(pizza);
		} else {
			updateRowWinkelmandje(pizza);
		}
		updateTotaal();
	});
	
	// De delete knop verwijdert alle pizzas van deze pizzanaam
	$("#winkelmandje button#delete"+naam).on("click", function(){
		var pizza = $(this).attr("id").slice(6);
		//console.log(pizza);
		removeRowFromWinkelmandje(pizza);
		updateTotaal();
	});
}

// -- Deelopgave 7 -- //
// Deze functie removeRowFromWinkelmandje verwijdert de volledige rij
// om geen geheugen lekken te hebben worden ook de events van de knoppen verwijdert.
function removeRowFromWinkelmandje(naam){
	delete winkelmandje[naam];
	$("#winkelmandje button#add"+naam).off();
	$("#winkelmandje button#remove"+naam).off();
	$("#winkelmandje button#delete"+naam).off();
	//$("#winkelmandje tr button).off();
	$("#winkelmandje tr#"+naam).remove();
}

// -- Deelopgave 4 -- //
// Deze functie updateRowWinkelmandje past het aantal pizzas en subtotaal van een rij aan.
function updateRowWinkelmandje(naam){
	$("#winkelmandje tr#"+naam+" td.aantal").html(winkelmandje[naam].aantal);
	$("#winkelmandje tr#"+naam+" td.subtotaal").html(winkelmandje[naam].kostprijs);
}

// --EVENTS-- //
// -- Deelopgave 2 -- //
// Wanneer we de pizzalijst wijzigen of met andere woorden
// een pizza in de lijst aangeduid wordt 
// tonen we de details van deze pizza
$("#pizzaLijst").change(function() {
	let pizza = $("#pizzaLijst option:selected").val();
	
	if (!pizzas[pizza]){
		alert("Geen pizzas beschikbaar!");
	}else{
		$("#showPizzaName").html(pizza);		
		$("#showPizzaDetails").html("Prijs: " + pizzas[pizza].prijs + "€<br>");
		$("#showPizzaDetails").html(function(i, current){
			return (current + "Ingrediënten: " + pizzas[pizza].ingredienten.join(", "));
		});
		//$("#showPizzaDetails").html($("#showPizzaDetails").html() + pizzas[pizza].ingredienten.join(", "));
		// kan zowel opgelost worden met een callback function als door de getter te gebruiken binnen de setter functie .html()
	}
});

// -- Deelopgave 3 -- //
// Wanneer de knop Bestel Pizza gedrukt wordt
// controleren we of alle verlden ingevuld werd voordat 
// we een pizza kunnen toevoegen aan het object winkelmandje
// en het winkelmandje tonen
// Wanneer de pizza al in winkelmandje zit, passen we de gegevens aan
$("#orderPizza").click(function(){
	//Lees aantal
	let aantal = +$("#aantal").val();
	//Lees de geselecteerd pizza
	let pizza = $("#pizzaLijst option:selected").val();
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
});

// -- Deelopgave 8 -- //
// Wanneer de knop Add extra Pizza gedrukt wordt
// controleren we of alle verlden ingevuld werd voordat 
// we een nieuwe pizza samenstellen
// en deze toevoegen aan het object pizzas
// en tonen in de selectielijst
$("#addPizza").click(function(){
	//Lees de ingevulde naam en prijs
	let pizzaNaam = $("#pizzaName").val();
	let pizzaPrijs = +$("#pizzaPrijs").val();
	let selectedIngredienten = [];
	$('#ingredientenLijst option:selected').each(function() { 
		selectedIngredienten.push($(this).val())
	});
	
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
});

// -- Deelopgave 8 -- //
// Wanneer de knop Add extra ingrediënt gedrukt wordt
// voegen we dit toe aan de array ingredients
// en tonen deze in de selectielijst
$("#addIngredient").click(function(){
	let nieuwIngredient = $("#ingredient").val();
	
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
});

});