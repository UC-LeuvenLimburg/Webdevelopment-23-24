// API Key: 0c2ca58148c45d28df0bdb1da958d03b

document.getElementById("toonWeer").addEventListener("click", function () {
	var WheatherAppUrl = "https://api.openweathermap.org/data/2.5/weather?appid=0c2ca58148c45d28df0bdb1da958d03b&units=metric&lang=nl&q=";
	var plaatsNaam = document.getElementById("plaatsNaam").value;

	if (plaatsNaam == "") {
		alert("Vul een plaatsnaam in.");
	} else {
		WheatherAppUrl += plaatsNaam;
		fetch(WheatherAppUrl)
			.then(response => {
				if (!response.ok) {
					throw Error("HTTP error: " + response.status + " " + response.statusText);
				 }
				 return response.json();
			})
			.then(data => {
				console.log(data);
				var plaats = data.name;
				var land = data.sys.country;
				var temperatuur = data.main.temp;
				var omschrijving = data.weather[0].description;
				var icoon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
				var wind = data.wind.speed;

				document.getElementById("resultaat").innerHTML = "<strong>" + plaats + ", " + land + "</strong>   " + temperatuur + "graden  " + omschrijving + "  <img src=" + icoon + " alt=" + omschrijving + "/>  " + wind;
			})
			.catch(error => {
				document.getElementById("resultaat").innerHTML = "Zoekopdracht voor " + plaatsNaam + " mislukt! "
				console.error(error);
			});
	}

});

