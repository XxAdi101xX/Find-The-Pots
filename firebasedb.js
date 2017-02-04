var firebase = new firebase("https://find-my-pots.firebaseio.com");\

var data = {
  sender: null,
  timestamp: null,
  lat: null,
  lng: null
};

function initAuthentication(onAuthSuccess) {
  firebase.authAnonymously(function(error, authData) {
    if (error) {
      console.log('Login Failed!', error);
    } else {
      data.sender = authData.uid;
      onAuthSuccess();
    }
  }, {remember: 'sessionOnly'});  // Users will get a new id for every session.
}

// Listener for when a click is added - add it to the heatmap.
clicks.orderByChild('timestamp').startAt(startTime).on('child_added',
  function(snapshot) {
    var newPosition = snapshot.val();
    var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
    heatmap.getData().push(point);
  }
);

function addToFirebase(data) {
  getTimestamp(function(timestamp) {
    // Add the new timestamp to the record data.
    data.timestamp = timestamp;
    var ref = firebase.child('clicks').push(data, function(err) {
      if (err) {  // Data was not written to firebase.
        console.log(err);
      }
    });
  });
}

/**
 * Also called each time the map is clicked.
 * Updates the last_message/ path with the current timestamp.
 * @param {function(Date)} addClick After the last message timestamp has been updated,
 *     this function is called with the current timestamp to add the
 *     click to the firebase.
 */
function getTimestamp(addClick) {
  // Reference to location for saving the last click time.
  var ref = firebase.child('last_message/' + data.sender);

  ref.onDisconnect().remove();  // Delete reference from firebase on disconnect.

  // Set value to timestamp.
  ref.set(Firebase.ServerValue.TIMESTAMP, function(err) {
    if (err) {  // Write to last message was unsuccessful.
      console.log(err);
    } else {  // Write to last message was successful.
      ref.once('value', function(snap) {
        addClick(snap.val());  // Add click with same timestamp.
      }, function(err) {
        console.log(err);
      });
    }
  });
}

// Create a heatmap.
var heatmap = new google.maps.visualization.HeatmapLayer({
  data: [],
  map: map,
  radius: 16
});

initAuthentication(initFirebase.bind(undefined, heatmap));

heatmap.getData().push(point);

