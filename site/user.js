angular.module('user', [])
.controller('userCtrl', function ($scope, $locale, $http) {
        if(null === localStorage.getItem("user") || angular.isUndefined(localStorage.getItem("user"))){
            localStorage.setItem("user", "octocat");
        }


        $scope.zenImage = Math.floor((Math.random() * 4) + 1);
        $scope.imgUrl = "url(img/zen/" + $scope.zenImage + ".jpg)";
        $scope.myStyle = {
            "background-image" : $scope.imgUrl
        }

        $scope.init = function() {
            window.onload = function() {
                var domEl = 'timeseries';
                var data = [{'value': 1380854103662},{'value': 1363641921283}];
                var brushEnabled = true;
                timeseries(domEl, data, brushEnabled);
              }
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
            }).catch(function(){console.log("Rejected promise")})
        }
        
        $scope.dirtyCommits = function (username){
            $http({
                method: "GET",
                url:"http://localhost:3000/dirtycommits/" + username
            })
               .then(function(response){
                $scope.muchCommits = response.data;
                if($scope.muchCommits.items.length == 0){
                    console.log("if");
                    $scope.randomMessage = "This user has a clean mouth!";
                }else{
                    console.log($scope.muchCommits.items.length);
                    $scope.rd = Math.floor((Math.random() * ($scope.muchCommits.items.length-1)));
                    console.log($scope.rd);
                    $scope.randomMessage = $scope.muchCommits.items[$scope.rd].commit.message;
                    $scope.nbCommits = $scope.muchCommits.total_count > 1000 ? 1000 : $scope.muchCommits.total_count;
                    $scope.score = ($scope.muchCommits.items.length*100/$scope.nbCommits)*100;
                }
            }, function(response){
                $scope.muchCommits = response.statusText;
                $scope.muchCommits = 2;
            }).catch(function(){console.log("Rejected promise")})
        }


    $scope.allUsers = function(){
        $http({
            method: "GET",
            url:"http://localhost:3000/users"
        })
           .then(function(response){
              
            $scope.users = response.data;
        }, function(response){
            $scope.users = response.statusText;
            $scope.users = 2;
        }).catch(function(){console.log("Rejected promise")})
    }



       $scope.usersInfo(localStorage.getItem("user"));
       $scope.dirtyCommits(localStorage.getItem("user"));
       $scope.allUsers();
       $scope.init();

       $scope.backToIndex = function(){
        location.href = '/';
       }


    });

