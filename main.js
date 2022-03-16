let latitude, longitude, destination;

$(document).ready(function(){
	alert("PLEASE LET ME KNoW YOUR LOCATION")
	initGeolocation()
})

$(function(){
	$("#navigate-button").click(function(){
		window.location.href = `ar_navigation.html?source=${latitude};${longitude}& destination = ${destination.lat};${destination.lng}`
	})
})
function initGeolocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(success)
	}
	else{
		alert("SORRY YOUR BOWSER DOESNT SUPPORT YOUR locaciones")
	}
}

function success(position){
	longitude = position.coords.longitude
	latitude = position.coords.latitude
	console.log(position)
	// Initializing Mapbox
	mapboxgl.accessToken = 'pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA';

	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [longitude, latitude],
		zoom: 16
	});   

	map.addControl(
		new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
				},
	      	trackUserLocation: true
	})
);

	map.addControl(
		new MapboxDirections({
			accessToken: mapboxgl.accessToken
		}),
		'top-left'
);
	map.on('click',function(e){
		destination = e.lngLat
	})
}
   