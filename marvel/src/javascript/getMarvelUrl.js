function getHash(){
	var publicKey = "c97a0c85709eb1a2a71994d9261ffbd6";
	var privateKey = "ba63ece6936566ddc4bf1219499fd705b8e32934";
	var ts = new Date().getTime();
	var hash = MD5( ts + privateKey + publicKey );
	hash = '?apikey=' + publicKey + "&ts=" + ts + "&hash=" + hash;
	return hash;
}

function getMarvelUrl ( complement ){
	
	var url = "http://gateway.marvel.com/v1/public/";  
	url = url + complement + getHash();

	return url; 
}; 