'use strict';

angular.module('fdjApp')
  .directive('templateGen',function () {
	return {
		restrict: "E",
		replace: true,
		template: "<div>Here I am to save the day</div>"
	}
});