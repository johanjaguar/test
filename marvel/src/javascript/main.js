/*var url = getMarvelUrl( 'characters') ;

ajax_get( url , function(data) {
	var datos = data['data']['results'];
	console.log(datos);
	var listado = "";
	datos.forEach(function(entry){ 
		//console.log(entry);
		//listado = listado + "<li class='character__item' data-name='" + entry["name"] + "'>" + entry["description"] + "</li>";
	});
	//document.getElementById("characters-list").innerHtml = listado;
});
 */
var app = angular.module("marvelApi", ["LocalStorageModule"]);
      