
// This function initializes user media
function getUserMedia(options, successCallback, failureCallback) {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices.getUserMedia(options)
      .then(successCallback)
      .catch(failureCallback);
  }
  throw new Error('User Media API not supported.');
}

function trackLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(showPosition, showError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  } else {
    document.getElementById('locationDisplay').textContent = 'Geolocation wird von Ihrem Browser nicht unterstützt.';
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  document.getElementById('locationDisplay').textContent = `Breitengrad: ${latitude}, Längengrad: ${longitude}`;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById('locationDisplay').textContent = "Benutzer hat die Anfrage nach Geolocation abgelehnt.";
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById('locationDisplay').textContent = "Standortinformationen sind nicht verfügbar.";
      break;
    case error.TIMEOUT:
      document.getElementById('locationDisplay').textContent = "Die Anfrage nach Benutzerstandort ist abgelaufen.";
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById('locationDisplay').textContent = "Ein unbekannter Fehler ist aufgetreten.";
      break;
  }
}








// ... Rest of your code such as service worker registration and notifications ...
