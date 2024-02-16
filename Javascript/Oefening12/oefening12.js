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
	for (var i=1; i<=20; i++) {
		tafels.push(i*getal);
		//tafels[i-1] = i*getal;
	} 
	return tafels;
}

function toonTafels(getal, tafels){
	let str="";
	for (let i=1; i<=tafels.length; i++) {
		//str += i + " * " + getal + " = " + tafels.shift() + "<br />"; 
		// Let op met tafels.shift() wordt tafels.length aangepast
		str += i + " * " + getal + " = " + tafels[i-1] + "<br />"; 		
	} 
	document.getElementById("resultaat").innerHTML = str;
}


function toonSom1(tafels){
	let som = 0;
	for (let i=0; i<tafels.length; i++) {
		som += tafels[i];		6
	} 
	document.getElementById("som1").innerHTML = "Som1: " + som;
}

function toonSom2(tafels){
	//var som = tafels.reduce((a,b)=>a+b,0); werkt niet in IE
	let som = tafels.reduce(function(a,b){return a+b;}, 0);
	document.getElementById("som2").innerHTML = "Som2: " + som;
}

var getal = leesGetal();
document.getElementById("waarde").innerHTML = getal;
var getalTafels = berekenTafels(getal);
console.log(getalTafels);
toonTafels(getal, getalTafels);
console.log(getalTafels);
toonSom1(getalTafels);
toonSom2(getalTafels);

