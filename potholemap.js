
var map;

function initMap() {
    map = new google
        .maps
        .Map(document.getElementById('map'), {
            center: {
                lat: 44.2253,
                lng: -76.4951
            },
            zoom: 15,
            styles: [
                {
                    featureType: 'poi',
                    stylers: [
                        {
                            visibility: 'off'
                        }
                    ] // Turn off points of interest.
                }, {
                    featureType: 'transit.station',
                    stylers: [
                        {
                            visibility: 'off'
                        }
                    ] // Turn off bus stations, train stations, etc.
                }
            ],
            disableDoubleClickZoom: true
        });

     function makeInfoBox(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '2px';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '10px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '100%';
    controlText.style.padding = '6px';
    controlText.innerText = 'The map shows all clicks made in the last 10 minutes.';
    controlUI.appendChild(controlText);
  }
  
    var infoWindow = new google
        .maps
        .InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator
            .geolocation
            .getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : 'Error: Your browser doesn\'t support geolocation.');
}
