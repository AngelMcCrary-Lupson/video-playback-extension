// TODO: Add CSS, Add Input Validation

document.addEventListener('DOMContentLoaded', function() {

  var store = window.localStorage;

  function removeChildren(parent) {
    while (parent.hasChildNodes()) {
      parent.removeChild(parent.firstChild);
    }
  }

  var editBtn = document.getElementById('save-btn');
  editBtn.addEventListener('click', function() {
    var speedVal = document.getElementById('custom-btn').value;
    var enabled = document.getElementById('btn-enabled').checked;
    var btn = document.getElementById('custom-btns').value;
    var storeKey = "btn-" + btn;
    var storeValue = speedVal + "-" + enabled;
    store.setItem(storeKey, storeValue);
    loadCustomButtons();
  }, false);

  function loadCustomButtons() {
    var customDiv = document.getElementById('custom-btns-div');
    removeChildren(customDiv);
    for (let i = 1; i <= 3; i++) {
      var btnValue = store.getItem('btn-' + i);
      var btnEnabled = btnValue.split("-")[1];

      if (btnEnabled == "true") {
        var btnSpeed = btnValue.split("-")[0];
        var button = document.createElement('button');
        button.innerText = btnSpeed;
        button.addEventListener('click', function() {
          var code = adjustPlayback(btnSpeed);
          chrome.tabs.executeScript(null,
              {code: code}, function(results){console.log("Changed speed: " + results);});
        }, false);
        customDiv.appendChild(button);
      } else if (btnValue == null) {
        store.setItem('btn-1', '0.0-false');
        store.setItem('btn-2', '0.0-false');
        store.setItem('btn-3', '0.0-false');
      }
    }
  }


  function adjustPlayback(speed) {
    let str = "document.getElementsByTagName(\"video\")[0].playbackRate = ";
    str += speed + ";";
    return str;
  }

  var mainView = true;

  function toggleView() {
    var mainDiv = document.getElementById('main-view');
    var settingsDiv = document.getElementById('settings-view');
    if (mainView) {
      mainView = false;
      mainDiv.className = "hidden";
      settingsDiv.className = "";
    } else {
      mainView = true;
      mainDiv.className = "";
      settingsDiv.className = "hidden";
    }
  }

  var settings = document.getElementById('settings-img');
  settings.addEventListener('click', function() {
    toggleView();
  }, false);

  var backBtn = document.getElementById('back-btn');
  backBtn.addEventListener('click', function(){
    toggleView();
  }, false);

  var oneButton = document.getElementById('1.0-btn');
  oneButton.addEventListener('click', function() {
    var code = adjustPlayback("1.0");
    chrome.tabs.executeScript(null,
        {code: code}, function(results){console.log("Changed speed: " + results);});
  }, false);

  var oneFiveButton = document.getElementById('1.5-btn');
  oneFiveButton.addEventListener('click', function() {
    var code = adjustPlayback("1.5");
    chrome.tabs.executeScript(null,
        {code: code}, function(results){console.log("Changed speed: " + results);});
  }, false);

  var twoButton = document.getElementById('2.0-btn');
  twoButton.addEventListener('click', function() {
    var code = adjustPlayback("2.0");
    chrome.tabs.executeScript(null,
        {code: code}, function(results){console.log("Changed speed: " + results);});
  }, false);

  var manualButton = document.getElementById('manual-btn');
  manualButton.addEventListener('click', function() {
    var input = document.getElementById('manual-speed');
    var speed = input.value + "";
    var code = adjustPlayback(speed);
    chrome.tabs.executeScript(null,
        {code: code}, function(results){console.log("Changed speed: " + results);});
  }, false);

  loadCustomButtons();

}, false);
