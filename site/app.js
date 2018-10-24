angular.module('app', [])
.controller('appCtrl', function ($scope, $window) {
    $scope.debug = 50;
        $scope.clickUser = function(username){
        $scope.debug=username;
        localStorage.setItem("user", username);
        location.href = '/user.html';
    }

    $scope.dirtyCommits = function (username){
        $http({
            method: "GET",
            url:"http://localhost:3000/dirtycommits/" + username
        })
           .then(function(response){
              
            $scope.muchCommits = response.data;
        }, function(response){
            $scope.muchCommits = response.statusText;
            $scope.muchCommits = 2;
        })
    }

    $scope.init = function(){
        loadLiquidFillGauge("fillgauge2", 95);
        loadLiquidFillGauge("fillgauge3", 84);
        loadLiquidFillGauge("fillgauge4", 70);
        loadLiquidFillGauge("fillgauge5", 59);
        loadLiquidFillGauge("fillgauge6", $scope.debug);
    }

    $scope.init();

            

   });

