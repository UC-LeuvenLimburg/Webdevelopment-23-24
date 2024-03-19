$(document).ready(function(){
	
  $("#box").on({
	mouseover: function(){
		$("#box").css("background-color", "green");
		// $("#resultaat").html(function(i,cur){ return cur + "De box werd betreden.<br />";});
		// $("#resultaat").html((i,cur) => cur + "De box werd betreden.<br />");
		$("#resultaat").fadeOut(500, function() {
			$("#resultaat").html("De box werd betreden.<br />").fadeIn(500)
		});
	},
	mouseout: function(){
		$("#box").css("background-color", "red");
		// $("#resultaat").html(function(i,cur){ return cur + "De box werd verlaten.<br />";});
		// $("#resultaat").append("De box werd verlaten.<br />");
		$("#resultaat").fadeOut(500, function() {
			$("#resultaat").html("De box werd verlaten.<br />").fadeIn(500);
		});
	},
	mousedown: function(){
		// $("#box").css("border", "5px solid blue");
		$("#box").css("border", "5px solid blue").animate({width:'120px', height:'120px'}, 500).animate({width:'100px', height:'100px'}, 500);
	},
	mouseup: function(){
		// $("#box").css("border", "0px none blue");
		$("#box").css("border", "0px none blue").animate({width:'120px', height:'120px'}, 500).animate({width:'100px', height:'100px'}, 500);
	}
	
  });
});
