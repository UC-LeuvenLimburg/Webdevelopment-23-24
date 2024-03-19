$("p").click(clickParagraaf);

function clickParagraaf(){
	$(this).css("color", "red");
	$(this).html("You're hacked!");
}

let btn = $("<button></button").text("voeg paragraaf toe");
$("body").append(btn);
btn.on("click", function () {
	let nummer = $("p").length;
	let p = $("<p></p>").text("Paragraaf " + (nummer + 1));
	p.on("click", clickParagraaf);
	btn.before(p);
})