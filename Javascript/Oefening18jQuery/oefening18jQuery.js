$(document).ready(function(){

	$("button").click(function(){
		var nieuweTitel = $("input").val();
		var titel = $("<h1></h1>").text(nieuweTitel); 
		//$("h1:first").remove();
		$("body").prepend(titel); 
	});

});
