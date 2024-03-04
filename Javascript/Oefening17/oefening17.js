var paragrafen = document.getElementsByTagName("p");
//var paragrafen = document.querySelectorAll("p");

for (let i = 0; i < paragrafen.length; i++) {
	// paragrafen[i].onclick = function () {
	// 	this.style.color = "red";
	// 	this.innerHTML = "You're hacked!"
	// };
	paragrafen[i].addEventListener("click", clickParagraaf);
}

function clickParagraaf() {
	this.style.color = "red";
	this.innerHTML = "You're hacked!"
}

// for(par of paragrafen){
// 	par.addEventListener("click", clickParagraaf);
// }

// Een forEach werkt NIET voor een HTMLCollection, die krijg je met getElementsByTagName
// Een forEach werkt WEL voor een NodeList, die krijg je met querySelectorAll
// zie ook https://www.w3schools.com/js/js_htmldom_nodelist.asp
// var paragrafen = document.querySelectorAll("p");
// paragrafen.forEach(element => {
// 	element.addEventListener("click", clickParagraaf);
// });


let btn = document.createElement("button");
btn.innerHTML = "voeg paragraaf toe";
document.body.appendChild(btn);
btn.addEventListener("click", function () {
	let p = document.createElement("p");
	p.innerHTML = "Paragraaf " + (paragrafen.length + 1); 
	// deze tellerwaarde werkt niet voor een NodeList omdat deze niet aangepast wordt
	p.addEventListener("click", clickParagraaf)
	document.body.insertBefore(p, btn);
})


