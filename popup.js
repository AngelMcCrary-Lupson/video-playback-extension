// TODO: Add CSS, Add Input Validation, Add Users Make Custom Buttons

document.addEventListener('DOMContentLoaded', function() {
  function adjustPlayback(speed) {
    let str = "document.getElementsByTagName(\"video\")[0].playbackRate = ";
    str += speed + ";";
    return str;
  }

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

  var customButton = document.getElementById('custom-btn');
  customButton.addEventListener('click', function() {
    var input = document.getElementById('custom-speed');
    var speed = input.value + "";
    var code = adjustPlayback(speed);
    chrome.tabs.executeScript(null,
        {code: code}, function(results){console.log("Changed speed: " + results);});
  }, false);

  // var checkPageButton = document.getElementById('checkPage');
  // checkPageButton.addEventListener('click', function() {
  //
  //   // function playback() {
  //   //   document.getElementsByTagName("video")[0].playbackRate = 2.0;
  //   // }
  //
  //   chrome.tabs.getSelected(null, function(tab) {
  //     console.log(tab);
  //     // d = document;
  //     //
  //     // var f = d.createElement('form');
  //     // f.action = 'http://gtmetrix.com/analyze.html?bm';
  //     // f.method = 'post';
  //     // var i = d.createElement('input');
  //     // i.type = 'hidden';
  //     // i.name = 'url';
  //     // i.value = tab.url;
  //     // f.appendChild(i);
  //     // d.body.appendChild(f);
  //     // f.submit();
  //   });
  //
  //   chrome.tabs.executeScript(null,
  //     {code: "document.getElementsByTagName(\"video\")[0].playbackRate = 2.0;"}, function(results){console.log("Changed speed: " + results);});
  // }, false);
}, false);
