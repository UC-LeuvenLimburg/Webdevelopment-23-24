var antwoord = prompt("Geef een zin in.");
var positie = antwoord.indexOf(" ");
var resultaat = "<p>In de zin: " + antwoord + "<br /> staat de spatie op positie " + (positie+1) + "</p>";
document.getElementById("resultaat").innerHTML = resultaat;