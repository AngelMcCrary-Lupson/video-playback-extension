// TODO: Clean Up Code

document.addEventListener('DOMContentLoaded', function() {

  var store = window.localStorage;

  var timer = null;
  var errorMsg = document.getElementById('error');
  var afterErrorMessage = function () {
    errorMsg.className = "hidden";
    clearTimeout(timer);
  };

  var startTimer = function () {
    errorMsg.className = "";
    timer = setTimeout(afterErrorMessage, 2500);
  };


  function removeChildren(parent) {
    while (parent.hasChildNodes()) {
      parent.removeChild(parent.firstChild);
    }
  }

  function validateSpeedInput(value) {
    var num = parseInt(value);
    if (num >= 0.1 && num <= 16) {
      return true;
    }
    startTimer();
    return false;
  }

  var selectInput = document.getElementById('custom-btns');

  selectInput.addEventListener('change', (event) => {
    console.log(event.target.value);
    populateInput(event.target);
  });

  function populateInput(selectObject) {
    var value = selectObject.value;
    var btnValue = store.getItem('btn-' + value);
    var btnSpeed = btnValue.split("-")[0];
    var btnEnabled = btnValue.split("-")[1];
    var customBtn = document.getElementById('custom-btn');
    var checkbox = document.getElementById('btn-enabled');

    if (btnSpeed != "0.0" && btnSpeed != "0") {
      customBtn.value = btnSpeed;
    } else {
      customBtn.value = "";
    }

    if (btnEnabled == "false") {
      checkbox.checked = false;
    } else {
      checkbox.checked = true;
    }
  }

  var editBtn = document.getElementById('save-btn');
  editBtn.addEventListener('click', function() {
    var speedVal = document.getElementById('custom-btn').value;
    if (selectInput.value != "" && validateSpeedInput(speedVal)) {
      var enabled = document.getElementById('btn-enabled').checked;
      var btn = document.getElementById('custom-btns').value;
      var storeKey = "btn-" + btn;
      var storeValue = speedVal + "-" + enabled;
      store.setItem(storeKey, storeValue);
      loadCustomButtons();
    }
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
        button.addEventListener('click', adjustButton, false);
        customDiv.appendChild(button);
      } else if (btnValue == null) {
        store.setItem('btn-1', '0.0-false');
        store.setItem('btn-2', '0.0-false');
        store.setItem('btn-3', '0.0-false');
      }
    }
  }

  function adjustButton(evt) {
    var code = adjustPlayback(evt.target.innerText);
    chrome.tabs.executeScript(null,
        {code: code}, function(results){console.log("Changed speed: " + results);}
      );
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
        {code: code}, function(results){console.log("Changed speed: " + results);}
      );
  }, false);

  var oneFiveButton = document.getElementById('1.5-btn');
  oneFiveButton.addEventListener('click', function() {
    var code = adjustPlayback("1.5");
    chrome.tabs.executeScript(null,
        {code: code}, function(results){console.log("Changed speed: " + results);}
      );
  }, false);

  var twoButton = document.getElementById('2.0-btn');
  twoButton.addEventListener('click', function() {
    var code = adjustPlayback("2.0");
    chrome.tabs.executeScript(null,
        {code: code}, function(results){console.log("Changed speed: " + results);}
      );
  }, false);

  var manualButton = document.getElementById('manual-btn');
  manualButton.addEventListener('click', function() {
    var input = document.getElementById('manual-speed');
    if (validateSpeedInput(input.value)) {
      var speed = input.value + "";
      var code = adjustPlayback(speed);
      chrome.tabs.executeScript(null,
          {code: code}, function(results){console.log("Changed speed: " + results);}
        );
    }

  }, false);

  loadCustomButtons();

}, false);
