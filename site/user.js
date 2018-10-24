angular.module('user', [])
.controller('userCtrl', function ($scope, $locale, $http) {
        if(null === localStorage.getItem("user") || angular.isUndefined(localStorage.getItem("user"))){
            localStorage.setItem("user", "octocat");
        }
        $scope.usersInfo = function(username){
            $http({
                method: "GET",
                url:"http://localhost:3000/users/" + username
            })
               .then(function(response){
                  
                $scope.thisUser = response.data;
            }, function(response){
                $scope.thisUser = response.statusText;
                $scope.thisUser = 2;
            })
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


       $scope.usersInfo(localStorage.getItem("user"));
       $scope.dirtyCommits(localStorage.getItem("user"));

       $scope.backToIndex = function(){
        location.href = '/';
       }


    });

