document.getElementById("btnBericht").onclick = function(){
	var mijnNaam = document.getElementById("naam").value;
	var mijnVoornaam = document.getElementById("voornaam").value;
	var mijnGeboortedatum = new Date(document.getElementById("geboortedatum").value);
	var currentDate = new Date();
	var geboortejaar = mijnGeboortedatum.getFullYear();
	var currentYear = currentDate.getFullYear();
	var leeftijd = currentYear - geboortejaar;
	if (mijnNaam == "")
	{alert("geef je naam in");}
	if (mijnVoornaam == "")
	{alert("geef je voornaam in");}
	if (isNaN(mijnGeboortedatum.getTime()))
	{alert("geef een geldige datum in.");}
	alert("Hallo " + mijnVoornaam + " " + mijnNaam + ", jij wordt dit jaar " + leeftijd + " jaar oud.");
}
