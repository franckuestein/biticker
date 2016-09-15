var request = require('request');
setInterval(function(){
	request("https://blockchain.info/es/ticker", function(error, response, body){
		body = JSON.parse(body);
		console.log(body);
		newPrice(body);
	});
}, 5000);

var lastPrice;
function newPrice(arr){
	currentPrice = arr.USD['last'];
	var history = document.getElementById("priceHistory");
	if (lastPrice < currentPrice) {
		var newElText = "▲ ";
		var wrap = document.createElement("span");
		wrap.className = "up";
	}else if (lastPrice == currentPrice) {
		var newElText = "- ";
		var wrap = document.createElement("span");
		wrap.className = "noChange";
	}else{
		var newElText = "▼ ";
		var wrap = document.createElement("span");
		wrap.className = "down";
	}
	history.appendChild(wrap);
	var textNode = document.createTextNode(newElText);
	wrap.appendChild(textNode);
	var nodeList = document.getElementsByTagName("span").length;
	if (nodeList == 6) history.children[0].remove();
	document.getElementById("price").innerHTML = currentPrice;
	lastPrice = currentPrice;
}