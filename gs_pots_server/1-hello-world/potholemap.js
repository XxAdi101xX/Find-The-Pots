// This example requires the Visualization library. Include the
// libraries=visualization parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visual
// ization">
var map, heatmap;

function initMap() {
    map = new google
        .maps
        .Map(document.getElementById('map'), {
            zoom: 15,
            center: {
                lat: 44.2253,
                lng: -76.4951
            },
            mapTypeId: 'roadmap'
        });

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(), 
        map: map,
        radius: 18
    });
    // ------------------
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('right-panel'));
    var control = document.getElementById('floating-panel');

    control.style.display = 'block';
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);
    //----------------------
     var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
        }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap()
        ? null
        : map);
}

// changes the colours of the heatmap
function changeGradient() {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

// Heatmap data: 500 Points
function getPoints() {
    return [
        new google.maps.LatLng(44.2253, -76.4951),
        new google.maps.LatLng(44.2260, -76.4954),
         //1324 Princess St
        new google.maps.LatLng(44.239422, -76.529734),
        //880-884 Johnson St
        new google.maps.LatLng(44.230944, -76.514128),
        //194 King St W
        new google.maps.LatLng(44.222468, -76.500454),
        //307 Union St W
        new google.maps.LatLng(44.225921, -76.505329),
        //269 Division St
        new google.maps.LatLng(44.236246, -76.493767),
        //212 Montreal St
        new google.maps.LatLng(44.237621, -76.485272),
        //154 Bagot St
        new google.maps.LatLng(44.228684, -76.486446),
        //94 Quebec St
        new google.maps.LatLng(44.238808, -76.492700),
        //208 Regent St
        new google.maps.LatLng(44.237026, -76.509272),
        //180 Toronto St
        new google.maps.LatLng(44.235430, -76.504274),
        //453 Frontenac St
        new google.maps.LatLng(44.234718, -76.498984),
        //212 University Ave
        new google.maps.LatLng(44.230295, -76.495676),
        // current location
        new google.maps.LatLng(44.225972, -76.495943)
    ];
}

var potHoles = 
[
    "Princess St",
    "Bath Rd",
    "King St W",
    "Union St W",
    "Division St",
    "Montreal St",
    "Bagot St",
    "Quebec St",
    "Regent St",
    "Toronto St",
    "Frontenac St",
    "University Ave",
    "Johnson St",
    "Concession St"
];

var allPotHoles = potHoles.length;
var routeNum = 1;
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
        directionsService.route({
          origin: start,
          destination: end,
          provideRouteAlternatives: true,
          travelMode: 'DRIVING'
        }, 
        function(response, status) {
          if (status === 'OK') {              
            directionsDisplay.setDirections(response);
            //console.log(directionsDisplay.panel.innerText);
            console.log(directionsDisplay.directions.routes[0].legs[0].steps[0].instructions);
            var altDirections = directionsDisplay.directions.routes.length;
            var instrLength;
            document.getElementById("info-panel").innerHTML = '<div id="title">' + "Pothole Advisory" + '</div>' + '<br>';
            for (var i = 0; i < altDirections; ++i) {
                routeNum = i + 1;
                instrLength = directionsDisplay.directions.routes[i].legs[0].steps.length;
                for (var j = 0; j < instrLength; ++j) {
                    // iterate through all the things in the database 
                    // and see if the road exists in steps[j].instructions
                    console.log(directionsDisplay.directions.routes[i].legs[0].steps[j].instructions);
                    for (var k = 0; k < allPotHoles; ++k) {
                        if ((directionsDisplay.directions.routes[i].legs[0].steps[j].instructions).includes(potHoles[k])) {
                            document.getElementById("info-panel").innerHTML += ("Be advised of potholes on " + potHoles[k] + " for Route " + routeNum + ". " + '<br>');
                        }
                    }
                }
            }
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });        
}

/*function getMessage() {
    return fetch('/message')
        .then(response => response.json())
        .then(console.log)
}*/

//setInterval(getMessage, 2000);


const num = 0;

function getUpdate() {
    substring1 = 'Received 1 Messages';
    substring2 = 'Received 2 Messages';
    substring3 = 'Received 3 Messages';
    substring4 = 'Received 4 Messages';
    substring5 = 'Received 5 Messages';
    substring6 = 'Received 6 Messages';
    return fetch('/updates')
        .then(response => console.log(response))//(function(){return response.includes(substring1)})
        /*.then(if (response.includes(substring1) 
                || response.includes(substring2)
                || response.includes(substring3)
                || response.includes(substring4)
                || response.includes(substring5)
                || response.includes(substring6)) {

                console.log('hiiiiiiiiiiiiiiiii');
            }*/
}

//setInterval(getUpdate, 1000);

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                    'Error: The Geolocation service failed.' :
                    'Error: Your browser doesn\'t support geolocation.');
}

