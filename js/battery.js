if ('getBattery' in navigator || ('battery' in navigator && 'Promise' in window)) {
  var target = document.getElementById('target');

  function handleChange(change) {
    var timeBadge = new Date().toTimeString().split(' ')[0];
    var newState = document.createElement('p');
    newState.innerHTML = '' + timeBadge + ' ' + change + '.';
    target.appendChild(newState);
  }
  
  function onChargingChange() {
    handleChange('Battery charging changed to ' + (this.charging ? 'charging' : 'discharging') + '')
  }
  function onChargingTimeChange() {
    handleChange('Battery charging time changed to ' + this.chargingTime + ' s');
  }
  function onDischargingTimeChange() {
    handleChange('Battery discharging time changed to ' + this.dischargingTime + ' s');
  }
  function onLevelChange() {
    handleChange('Battery level changed to ' + this.level + '');
  }

  var batteryPromise;
  
  if ('getBattery' in navigator) {
    batteryPromise = navigator.getBattery();
  } else {
    batteryPromise = Promise.resolve(navigator.battery);
  }
  
batteryPromise.then(function (battery) {
    // Aktualisiert die Anzeige mit den initialen Werten
    document.getElementById('charging').innerHTML = battery.charging ? 'charging' : 'discharging';
    document.getElementById('chargingTime').innerHTML = battery.chargingTime + ' s';
    document.getElementById('dischargingTime').innerHTML = battery.dischargingTime + ' s';
    document.getElementById('level').innerHTML = battery.level;
    
    // Event-Listener hinzufügen
    battery.addEventListener('chargingchange', onChargingChange);
    battery.addEventListener('chargingtimechange', onChargingTimeChange);
    battery.addEventListener('dischargingtimechange', onDischargingTimeChange);
    battery.addEventListener('levelchange', onLevelChange);
    
    // Funktion für die Batterie-Level-Änderung
    function onLevelChange() {
        var level = this.level * 100;
        handleChange('Battery level changed to ' + level + '%');
        var batteryCircle = document.getElementById('batteryCircle');
        batteryCircle.style.setProperty('--level', level + '%');
        batteryCircle.innerHTML = level + '%';
    }

    // Initialen Batteriezustand anzeigen
    onLevelChange.call(battery);
});

}

