var publicKey = "c97a0c85709eb1a2a71994d9261ffbd6";
var privateKey = "ba63ece6936566ddc4bf1219499fd705b8e32934";
var url = "http://gateway.marvel.com/v1/public/";

function getMarvelData ( url, publicKey, privateKey, specific ){
	var ts = new Date().getTime();
	var hash = MD5( ts + privateKey + publicKey );
	url = url + specific;
	url = url + "?apikey=" + publicKey;
	url = url + "&ts=" + ts;
	url = url + "&hash=" + hash;
	return url;
};
url = getMarvelData( url, publicKey, privateKey, 'characters');
ajax_get( url , function(data) {
	console.log(data['data']['results']);
  document.getElementById("ventanaTest").innerHTML = data;
});
 


    