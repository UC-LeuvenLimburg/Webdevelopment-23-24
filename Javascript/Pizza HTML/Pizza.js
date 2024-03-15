// Ingrediënten, pizzas en winkelmandje zijn globale objecten
// zo zijn ze eigenlijk eigenschappen van de pagina
// We voegen al een paar ingrediënten en pizza's toe bij opstarten.
// Het winkelmandje is leeg bij opstarten. 

var ingredients=["tomatensaus","hesp","mozarella","ananas"];
var pizzas = {
	Margherita:{
		// name: "Margherita",
		prijs: 10.5,
		ingredienten:["tomatensaus","mozarella"]
	},
	Hawai:{
		// name: "Hawai",
		prijs: 12.0,
		ingredienten:["tomatensaus", "mozarella", "hesp", "ananas"]
	}
};
var winkelmandje = [];

//We voeren bij opstarten de functie addList uit
//om bij opstarten de hierboven gemaakte pizzas en ingrediënten te tonen
addList();

//De functie voegt een option toe aan de select
// Het eerste argument is het id van de lijst.
// Het tweede argument is de tekst die toegevoegd moet worden
function addItemToSelect(selectName, optionName){
	var select = document.getElementById(selectName);
	var option = document.createElement("option");
	option.text = optionName; //kan ook met innerHTML of createTextNode
	select.add(option);  //en appendChild
}

//De functie vult de 2 lijsten met: 
// - de pizza's die in het object pizzas zitten
// - de ingrediënten die in de array ingredients zitten
function addList(){
	for (var pizza in pizzas){
		// addItemToSelect("pizzaLijst", pizzas[pizza].name);
		addItemToSelect("pizzaLijst", pizza);
		//pizza is de eerste keer "Margherita" en de tweede keer "Hawai"
		//pizza is dus een String die de naam van de pizzas voorstelt
		//Omdat pizza een Object is (en geen Array)
		// bestaat pizzas.length niet of geeft dit de waarde 0
	}
	
	// -- 4 wijzes om een array waardes toe te voegen --
	// voor een array kunnen we niet werken met for in
	// we kunnen wel een for maken aan de hand van de lengte van de array
	// 	i is dus een getal, van 0 tot de lengte-1
	// for (var i=0; i<ingredients.length; i++){
	// 	addItemToSelect("ingredientenLijst", ingredients[i]);
	// 	
	// }

	// ingredients.forEach(function(ingredient){
	// 	addItemToSelect("ingredientenLijst", ingredient);
	// });

	// ingredients.forEach(ingredient => {addItemToSelect("ingredientenLijst", ingredient)});

	for (ingredient of ingredients){
		addItemToSelect("ingredientenLijst", ingredient);
	}
}

//De functie leest het (globaal) object winkelmandje
//en toont een rij voor elke pizza in het winkelmandje
//update ook de totaalprijs van het winkelmandje
function toonWinkelmandje(){
	var tabel = document.getElementById("winkelmandje");
	var totaalrij = document.getElementById("totaalrij");
		
	// verwijder eerst de huidige info
	// de eerste en laatste rij mogen niet verwijdert worden
	while (tabel.children.length > 2){
		tabel.removeChild(tabel.children[1]);  
	}
	
	//Om het totaal te berekenen moeten we het eerst initialiseren
	var totaal = 0;
	//Voor elke pizza in het winkelmandje
	for (var pizza in winkelmandje){
		//verhogen we het totaal met het subtotaal van de pizza
		totaal += winkelmandje[pizza].kostprijs
		//maken we een rij met elk 3 kolommen
		//elke kolom heeft een textnode
		var rij = document.createElement("tr");  
		var aantalKolom = document.createElement("td");
		var naamKolom = document.createElement("td");
		var subtotaalKolom = document.createElement("td");
		var aantalText = document.createTextNode(winkelmandje[pizza].aantal); 
		var naamText = document.createTextNode(pizza); 
		var prijsText = document.createTextNode(winkelmandje[pizza].kostprijs); 
		//voeg de textnodes toe aan de kolommen
		aantalKolom.appendChild(aantalText);
		naamKolom.appendChild(naamText);
		subtotaalKolom.appendChild(prijsText);
		/* OF
		aantalKolom.innerHTML = winkelmandje[pizza].aantal;
		naamKolom.innerHTML = pizza;
		subtotaalKolom.innerHTML = winkelmandje[pizza].kostprijs;
		*/
		//voeg de kolommen toe aan de rij
		rij.appendChild(aantalKolom);
		rij.appendChild(naamKolom);
		rij.appendChild(subtotaalKolom);
		//voeg de rij toe aan de tabel
		tabel.insertBefore(rij, totaalrij); 
	}
	// Wijzig het nieuwe berekende totaal
	document.getElementById("totaal").innerHTML = totaal;
}

// --EVENTS-- //
//Wanneer we de pizzalijst wijzigen of met andere woorden
//een pizza in de lijst aangeduid wordt 
//tonen we de details van deze pizza
document.getElementById("pizzaLijst").addEventListener("change", function() {
	//var pizzalijst = document.getElementById("pizzaLijst"); 
	//pizzaLijst kan in dit event vervangen worden door this
	//omdat dit het element is waarop het event wordt toegepast
	
	//pizzaNaam is de string "Hawai" of "Margherita"
	var pizzaNaam = this.value;
					//this.options[this.selectedIndex].value;
	  				//omdat we maar 1 item selecteren in de lijst, 
	  				//geven beide hetzelfde
				
	//Toon geselecteerde pizzaNaam, prijs van geselecteerde pizza en lijst van ingrdeiënten van geselecteerde pizza
	document.getElementById("showPizzaName").innerHTML = pizzaNaam;
	document.getElementById("showPizzaDetails").innerHTML = "Prijs: " + pizzas[pizzaNaam].prijs + "€</br>";
	document.getElementById("showPizzaDetails").innerHTML += "Ingrediënten: " + pizzas[pizzaNaam].ingredienten.join(', ');
});

//Wanneer de knop Bestel Pizza gedrukt wordt
//moeten we pizza's toevoegen aan het object winkelmandje
//en het winkelmandje tonen
//Door dit op te slaan in het object winkelmandje 
// weten we welke pizza's al getoond zijn. 
document.getElementById("orderPizza").addEventListener("click", function() {
	//Lees aantal
	var aantal = +document.getElementById("aantal").value;
	//Lees de geselecteerd pizza
	//var pizzalijst = document.getElementById("pizzaLijst");
	var selectedPizza = document.getElementById("pizzaLijst").value;	
	// pizzalijst.options[pizzalijst.selectedIndex].value;
	// Controleer of aantal een positief getal is 
	if (isNaN(aantal) || aantal <= 0){
        alert("Vul het aantal pizzas dat je wilt bestellen in.");
	//Controleer of de geselecteerde pizza bestaat 
	} else if (!pizzas[selectedPizza]) {
	//} else if (pizzalijst.selectedIndex <= -1){
        alert("Selecteer de pizza die je wil bestellen.");
	} else {
		// zit deze pizza al in het winkelmandje?
		if (winkelmandje[selectedPizza]) {
		// dan verhogen we aantal en subtotaal
		winkelmandje[selectedPizza].aantal += aantal;
        winkelmandje[selectedPizza].kostprijs += aantal*pizzas[selectedPizza].prijs; 
		} else {
		// zo niet, dan voegen we deze toe, met zijn aantal en subtotaal
		winkelmandje[selectedPizza] = {
			aantal: aantal, 
			kostprijs: aantal*pizzas[selectedPizza].prijs
			};
		}
		console.log(winkelmandje);
		toonWinkelmandje();	
	} 
});


//Wanneer de knop Add extra Pizza gedrukt wordt
//stellen we een nieuwe pizza samen
//voegen deze toe aan het object pizzas
//en tonen deze in de selectielijst
document.getElementById("addPizza").addEventListener("click", function() {
	//Lees de ingevulde naam en prijs
	var pizzaNaam = document.getElementById("pizzaName").value;
	var pizzaPrijs = +document.getElementById("pizzaPrijs").value;
	//Neem alle opties uit de lijst
	//Wanneer ze geselecteerd zijn, voeg je dan toe aan een nieuwe array
	var ingredientenLijst = document.getElementById("ingredientenLijst").options;
	var selectedIngredienten = [];
	
	// for (var i = 0; i < ingredientenLijst.length; i++){
	// 	if (ingredientenLijst[i].selected){
	// 		selectedIngredienten.push(ingredientenLijst[i].value);
	// 	}
	// }

	// for (ingredient of ingredientenLijst){
	// 	if (ingredient.selected){
	// 		selectedIngredienten.push(ingredient.value);
	// 	}
	// }
	//Let op: Hier kan je geen .forEach, .filter of .map gebruiken omdat ingredientenLijst geen array is
	// maar wel een HTMLOptionsCollection
	// via volgende omweg zou het wel kunnen: 
	var selectedOptions = document.getElementById("ingredientenLijst").selectedOptions;
	//selectedIngredienten = Array.from(selectedOptions).map(option => option.value);
	//OF 
	for (option of selectedOptions){
		selectedIngredienten.push(option.value);
	}
	
	//Controleer de ingave
	if (pizzaNaam.length < 1 || isNaN(pizzaPrijs) || pizzaPrijs <= 0 || selectedIngredienten.length <= 0) {
		alert("De gegevens om een pizza toe te voegen zijn niet volledig of niet correct.");
	// controleer of de pizza al bestaat.
	} else if(pizzas[pizzaNaam]){
		alert("Deze pizza bestaat al.");
	} else {
	// wanneer de ingave correct is
	// voeg een nieuwe pizza toe aan het object pizzas
	// en voeg het toe aan de pizza selectielijst
		pizzas[pizzaNaam] = {
			prijs: pizzaPrijs, 
			ingredienten: selectedIngredienten
			};
		addItemToSelect("pizzaLijst", pizzaNaam);
	}
	
});

//Wanneer de knop Add extra ingrediënt gedrukt wordt
//voegen dit toe aan de array ingredients
//en tonen deze in de selectielijst
document.getElementById("addIngredient").addEventListener("click", function() {
	var nieuwIngredient = document.getElementById("ingredient").value;
	
	//controleer of een ingredient werd ingegeven
	if (nieuwIngredient.length <= 0){
		alert("Geef ingredient in.");
	} else {
		//controleer of het ingredient al bestaat
		var bestaatAl = false;
		// for (var i = 0; i<ingredients.length; i++){
		// 	if (nieuwIngredient == ingredients[i]){
		// 		alert("ingredient bestaat al");
		// 		bestaatAl = true;
		// 	}
		// }
		// ingredients.forEach(function(ingredient){
		// 	if (nieuwIngredient == ingredient){
		// 		alert("ingredient bestaat al");
		//  		bestaatAl = true;
		// 	}
		// });
		// ingredients.forEach((ingredient) => {
		// 	if (nieuwIngredient == ingredient){
		// 		alert("ingredient bestaat al");
		// 		bestaatAl = true;
		// 	}
		// });
		for (ingredient of ingredients){
			if (nieuwIngredient == ingredient){
				alert("ingredient bestaat al");
				bestaatAl = true;
			}
		}

		if (!bestaatAl){
			ingredients.push(nieuwIngredient);
			addItemToSelect("ingredientenLijst", nieuwIngredient);
		}
	}
});