document.addEventListener('DOMContentLoaded', function() {

  var store = window.localStorage;
  var mainView = true;
  var timer = null;

  var errorMsg = document.getElementById('error');

  // Hides the error message from view
  var afterErrorMessage = function () {
    errorMsg.className = "hidden";
    clearTimeout(timer);
  };

  // Displays error message for 2.5 seconds
  var startTimer = function () {
    errorMsg.className = "";
    timer = setTimeout(afterErrorMessage, 2500);
  };

  /**
    * Removes the given objects children
    * @param {Object} parent - an element object whose children are to be removed
    */
  function removeChildren(parent) {
    while (parent.hasChildNodes()) {
      parent.removeChild(parent.firstChild);
    }
  }

  /**
    * Assures that the given input's playback speed value is valid
    * @param {String} value - the input value being checked
    * @return {Boolean} whether the input is valid or not
    */
  function validateSpeedInput(value) {
    var num = parseInt(value);
    if (num >= 0.1 && num <= 16) {
      return true;
    }
    startTimer(); // Displays error message
    return false;
  }

  /**
    * Populates the given select input with a corresponding value from local storage
    * @param {Object} selectObject - the select input to be populated from local storage values
    */
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

  /**
    * Loads the buttons with custom playback speeds if enabled
    */
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

  /**
    * Function for adding code script to custom playback buttons
    * @param {Event} evt - event that called this function
    */
  function adjustButton(evt) {
    var code = adjustPlayback(evt.target.innerText);
    chrome.tabs.executeScript(null,
        {code: code});
  }

  /**
    * Returns the code for adjusting a video's playback speed as a string
    * @param {Integer} speed - the playback speed
    * @return {String} the string of executable code
    */
  function adjustPlayback(speed) {
    let str = "document.getElementsByTagName(\"video\")[0].playbackRate = ";
    str += speed + ";";
    return str;
  }

  // Toggles between the main view of the exetension and the settings
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

  // Initialize the exetension's buttons

  var selectInput = document.getElementById('custom-btns');
  selectInput.addEventListener('change', (event) => {
    populateInput(event.target);
  });

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
        {code: code});
  }, false);

  var oneFiveButton = document.getElementById('1.5-btn');
  oneFiveButton.addEventListener('click', function() {
    var code = adjustPlayback("1.5");
    chrome.tabs.executeScript(null,
        {code: code});
  }, false);

  var twoButton = document.getElementById('2.0-btn');
  twoButton.addEventListener('click', function() {
    var code = adjustPlayback("2.0");
    chrome.tabs.executeScript(null,
        {code: code});
  }, false);

  var manualButton = document.getElementById('manual-btn');
  manualButton.addEventListener('click', function() {
    var input = document.getElementById('manual-speed');
    if (validateSpeedInput(input.value)) {
      var speed = input.value + "";
      var code = adjustPlayback(speed);
      chrome.tabs.executeScript(null,
          {code: code});
    }

  }, false);

  loadCustomButtons();

}, false);
