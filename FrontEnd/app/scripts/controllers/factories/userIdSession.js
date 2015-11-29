'use strict';
app.factory('userIdSession', function() {
 var savedData = {}
 function set(data) {
   	savedData = data;
 }
 function get() {
  	return savedData;
 }

 return {
  	set: set,
  	get: get
 }

});