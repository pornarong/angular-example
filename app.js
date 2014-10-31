var myApp = angular.module('myApp', ['ui.bootstrap', 'ngRoute', 'ngAnimate']);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'main/main.html',
		controller: 'MainCtrl'
	})
	.when('/Animate', {
		templateUrl: 'animate.html',
		controller: 'AnimateCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);

myApp.controller('MenuCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}])

myApp.controller('AnimateCtrl', ['$scope', function($scope){
	$scope.message = "I'm Animation Page";
}])

myApp.controller('MainCtrl', ['$scope', 'Math', 'Server', function ($scope, Math, Server) {
	$scope.user = {};
	$scope.user.x = 0;
	$scope.user.y = 0;
	$scope.user.text = "";
    $scope.user.details = {
      	"username": "I'm Angular",
      	"id": "123456789"
    };

    $scope.test1 = null;
    $scope.test2 = ["One", "Two"];

    $scope.Math = Math;
    $scope.locations = {};
    $scope.getLocation = function() {
    	Server.executeService({fsp_action: 'locationAction', fsp_cmd: 'syncLocation', LOCATIONTYPE: "branch"})
		.then(function(result) {
			$scope.locations = result.data.ds_location;
		});
    };
    $scope.deleteLocation = function (index) {
    	$scope.locations.splice(index, 1)
  	};
    $scope.clearLocation = function() {
    	$scope.locations = {};
    }
}]);

myApp.factory('Server', ['$http', function($http){
	return {
		executeService: function(param) {
			return $http.post('http://localhost:8080/JSON', param);
		}
	};
}])

myApp.filter('reverse', function () {
    return function (input, uppercase) {
        var out = '';
        for (var i = 0; i < input.length; i++) {
            out = input.charAt(i) + out;
        }
        if (uppercase) {
            out = out.toUpperCase();
        }
        return out;
    }
});

myApp.factory('Math', function () {
  	return {
	    multiply: function(x, y) {
	      	return parseFloat(x) * parseFloat(y);
	    },
	    plus: function(x, y) {
	      	return parseFloat(x) + parseFloat(y);
	    },
	    minus: function(x, y) {
	    	return parseFloat(x) - parseFloat(y);
	    }
  	};
});

myApp.directive('customButton', function () {
  	return {
    	restrict: 'A',
	    replace: true,
	    transclude: true,
	    /*
	    template: '<a href="" class="myawesomebutton" ng-transclude>' +
	                '<i class="icon-ok-sign"></i>' +
	              '</a>',
		*/
		templateUrl: 'component/customButton.html',
	    link: function (scope, element, attrs) {
	      // DOM manipulation/events here!
	    }
  	};
});