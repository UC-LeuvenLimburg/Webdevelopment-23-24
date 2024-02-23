document.getElementById("box").onmouseover = function(){
	document.getElementById("resultaat").innerHTML += "De box werd betreden.<br />";
	document.getElementById("box").style.backgroundColor = "green";
	/* OF this.style.backgroundColor = "green"; */
};

document.getElementById("box").onmouseout = function(){
	document.getElementById("resultaat").innerHTML += "De box werd verlaten.<br />";
	document.getElementById("box").style.backgroundColor = "red";
};

document.getElementById("box").onmousedown = function(){
	document.getElementById("box").style.border = "5px solid blue";
};

document.getElementById("box").onmouseup = function(){
	document.getElementById("box").style.border = "0px none blue";
};

/* Met afzonderlijke functie:
document.getElementById("box").onmouseover = function(){boxMouseOver()};

function boxMouseOver(){
	document.getElementById("resultaat").innerHTML += "De box werd betreden.<br />";
	document.getElementById("box").style.backgroundColor = "green";
	/* Opgelet binnen een afzonderlijk functie of een arrow functie werkt this niet, 
	wel event.target, maar dan moet je event meegeven als argument van de functie, 
	zie lager voor arrow functie voorbeeld
};
*/

/* Met addEventListener en anonieme functie: 
document.getElementById("box").addEventListener("mouseover", function(){
	document.getElementById("resultaat").innerHTML += "De box werd betreden.<br />";
	document.getElementById("box").style.backgroundColor = "green"; 
	OF this.style.backgroundColor = "green";
});
*/

/* Met addEventListener en functie aanroep: 
document.getElementById("box").addEventListener("mouseover", boxMouseOver);

function boxMouseOver(){
	document.getElementById("resultaat").innerHTML += "De box werd betreden.<br />";
	document.getElementById("box").style.backgroundColor = "green"; 
	 OF this.style.backgroundColor = "green";
};
*/

/* Met addEventListener en arrow functie 
document.getElementById("box").addEventListener("mouseover", () => {
	document.getElementById("resultaat").innerHTML += "De box werd betreden.<br />";
	document.getElementById("box").style.backgroundColor = "green"; 
});
*/

/* Met arrow functie
document.getElementById("box").onmouseover = () => {
	document.getElementById("resultaat").innerHTML += "De box werd betreden.<br />";
	document.getElementById("box").style.backgroundColor = "green"; 
};
 */
 
/* Je kan ook het event gebruiken om het event.target te kunnen gebruiken: 
document.getElementById("box").addEventListener("mouseover", (event) => {
	document.getElementById("resultaat").innerHTML += "De box werd betreden.<br />";
	event.target.style.backgroundColor = "green";
});
werkt voor de 3 wijzes waarop this niet werkt
*/
