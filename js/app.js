// Define global variables to keep track of the stream and recorder
var theStream;
var theRecorder;
var recordedChunks = [];

// This function initializes user media
function getUserMedia(options, successCallback, failureCallback) {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices.getUserMedia(options)
      .then(successCallback)
      .catch(failureCallback);
  }
  throw new Error('User Media API not supported.');
}


// This function is called to start the media stream and recording
function getStream() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('User Media API not supported.');
    return;
  }

  var constraints = { video: true, audio: true };
  getUserMedia(constraints, function (stream) {
    var mediaControl = document.querySelector('video');
    
    // Older browsers may not have srcObject
    if ("srcObject" in mediaControl) {
      mediaControl.srcObject = stream;
    } else {
      // Avoid using this in new browsers, as it is going away.
      mediaControl.src = window.URL.createObjectURL(stream);
    }
    
    theStream = stream;
    setupRecorder(stream); // This is a new function to encapsulate the recorder setup
  }, function (err) {
    alert('Error: ' + err);
  });
}


// Stops the recording and saves the video to cache
function stopRecordingAndSaveToCache() {
  console.log('Stopping recording and saving data');
  theRecorder.stop();
  theStream.getTracks().forEach(track => track.stop());

  theRecorder.onstop = function() {
    // Create a Blob from the recorded chunks
    var blob = new Blob(recordedChunks, { type: 'video/webm' });
    saveToCache(blob);
  };
}

// Saves the recording Blob to the cache
function saveToCache(blob) {
  var cacheKey = 'cached-video';
  var request = new Request(cacheKey);
  var response = new Response(blob);

  caches.open('video-cache').then(function(cache) {
    cache.put(request, response).then(function() {
      console.log('Saved video to cache.');
    }).catch(function(error) {
      console.error('Failed to save video to cache:', error);
    });
  });
}

// ... Rest of your code such as service worker registration and notifications ...
