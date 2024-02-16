var getal;
do{
	getal = +prompt("Geef een getal van 1 tot 20.");
}
while (isNaN(getal) || getal < 1 || getal > 20);

document.getElementById("waarde").innerHTML = getal;

var str="";
for (let i=1; i<=20; i++) {
	str += i + " * " + getal + " = " + (i*getal) + "<br />"  
} 
document.getElementById("resultaat").innerHTML = str;
