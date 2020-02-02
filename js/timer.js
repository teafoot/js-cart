"use strict";

var future = new Date("12/21/2019").getTime();

var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = future - now;

	var days = distance / (1000 * 60 * 60 * 24); // milliseconds -> days
	var hours = (days - Math.floor(days)) * 24;
	var minutes = (hours - Math.floor(hours)) * 60;
	var seconds = (minutes - Math.floor(minutes)) * 60;
    
  document.getElementById("countdown").innerHTML = Math.floor(days) + " days " + Math.floor(hours) + " hours "
  + Math.floor(minutes) + " minutes " + Math.floor(seconds) + " seconds left!";
    
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "The Clearance Sale Period has Ended!";
  }
}, 1000);