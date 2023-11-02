// Assuming container is defined in your HTML
// const container = document.querySelector(".container");

function getUserMedia(options, successCallback, failureCallback) {
  var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (api) {
    return api.bind(navigator)(options, successCallback, failureCallback);
  }
}

var theStream;
var theRecorder;
var recordedChunks = [];

function getStream() {
  if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
    alert('User Media API not supported.');
    return;
  }
  
  var constraints = {video: true, audio: true};
  getUserMedia(constraints, function (stream) {
    var mediaControl = document.querySelector('video');
    
    if ('srcObject' in mediaControl) {
      mediaControl.srcObject = stream;
    } else {
      mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
    }
    
    theStream = stream;
    try {
      theRecorder = new MediaRecorder(stream, {mimeType: "video/webm"});
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e);
      return;
    }
    console.log('MediaRecorder created');
    theRecorder.ondataavailable = recorderOnDataAvailable;
    theRecorder.start(100);
  }, function (err) {
    alert('Error: ' + err);
  });
}

function recorderOnDataAvailable(event) {
  if (event.data.size === 0) return;
  recordedChunks.push(event.data);
}

function saveToCache() {
  console.log('Saving data to cache');
  theRecorder.stop();
  theStream.getTracks().forEach(track => track.stop());

  var blob = new Blob(recordedChunks, {type: "video/webm"});
  var url = (window.URL || window.webkitURL).createObjectURL(blob);

  var request = new Request(url);
  var response = new Response(blob);

  caches.open('video-cache').then(function(cache) {
    cache.put(request, response).then(function() {
      console.log('Video was saved to cache!');
    }).catch(function(error) {
      console.error('Failed to save video to cache:', error);
    });
  });

  setTimeout(function () {
    (window.URL || window.webkitURL).revokeObjectURL(url);
  }, 100);
}


// downloadFromCach
function downloadFromCache() {
  // Assuming 'video-cache' is the name of your cache where the video is stored
  caches.open('video-cache').then(function(cache) {
    cache.matchAll().then(function(responses) {
      // Here we only expect one match since we're only storing one video
      responses[0].blob().then(function(blob) {
        // Create a URL for the blob
        var url = (window.URL || window.webkitURL).createObjectURL(blob);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = 'recorded-video.webm'; // You can name your file here
        a.click();
        
        // Clean up by revoking the URL and removing the anchor element
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
    });
  });
}


// Service Worker and Notification code remains unchanged...
// ...

// Make sure to update the appropriate event listener or function call 
// to use saveToCache instead of download where necessary
