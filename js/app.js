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

function saveToCache(blob) {
  // Create a new URL for the blob
  var url = URL.createObjectURL(blob);

  // Create a new Request and Response object
  var request = new Request(url);
  var response = new Response(blob);

  // Open the desired cache and store the Response object
  caches.open('video-cache').then(function(cache) {
    cache.put(request, response).then(function() {
      console.log('Saved video to cache.');
      // Revoke the blob URL to free up memory
      URL.revokeObjectURL(url);
    }).catch(function(error) {
      console.error('Failed to save video to cache:', error);
    });
  });
}



// downloadFromCach
function downloadFromCache() {
  // Open the cache where the video is stored
  caches.open('video-cache').then(function(cache) {
    // Use a cache key that you used when storing the video
    cache.match('video-key').then(function(response) {
      if (response) {
        // Retrieve the video blob from the cache response
        response.blob().then(function(blob) {
          // Create a URL for the blob
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = url;
          a.download = 'cached-video.webm'; // Set a filename for the download
          a.click();
          
          // Clean up
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        });
      } else {
        console.error('Video not found in cache.');
      }
    });
  });
}



// Service Worker and Notification code remains unchanged...
// ...

// Make sure to update the appropriate event listener or function call 
// to use saveToCache instead of download where necessary
