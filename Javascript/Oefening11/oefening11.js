function leesGetal(){
	let getal;
	do{
	getal = +prompt("Geef een getal van 1 tot 20.");
	}
	while (isNaN(getal) || getal < 1 || getal > 20);
	return getal;
}

function berekenTafels(getal){
	let tafels=[];
	for (let i=1; i<=20; i++) {
		tafels.push(i*getal);
		//tafels[i-1] = i*getal;
	} 
	return tafels;
}

function toonTafels(getal, tafels){
	let str="";
	for (let i=1; i<=tafels.length; i++) {
		str += i + " * " + getal + " = " + tafels[i-1] + "<br />"; 	
		//str += i + " * " + getal + " = " + tafels.shift() + "<br />"; 
		//getal++;	
		// stel vast dat wanneer je getal wijzigt globaalGetal niet wijzigt.
		// verwijder je daarentegen elementen uit de array tafels dan worden deze ook verwijdert uit de globale array getalTafels
	} 
	document.getElementById("resultaat").innerHTML = str;
}

var getalGlobaal = leesGetal();
document.getElementById("waarde").innerHTML = getalGlobaal;
var getalTafels = berekenTafels(getalGlobaal);
console.log(getalTafels);
console.log(getalGlobaal);
toonTafels(getalGlobaal, getalTafels);
console.log(getalTafels);
console.log(getalGlobaal);

