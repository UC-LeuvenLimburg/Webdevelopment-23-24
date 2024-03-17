$(document).ready(function() {
	$("p").click(clickParagraaf);
});

function clickParagraaf(){
	$(this).css("color", "red");
	$(this).html("You're hacked!");
}

let btn = $("<button></button").text("voeg paragraaf toe");
$("body").append(btn);
btn.on("click", function () {
	let p = $("<p></p>").text(function(i){return "Paragraaf " + (i + 1)});
	//let p = $("<p></p>").text(i => "Paragraaf " + (i + 1));
	p.on("click", clickParagraaf)
	$("body").before(p, btn);
})