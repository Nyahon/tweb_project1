angular.module('app', [])
.controller('appCtrl', function ($scope, $window, $http) {
    $scope.indexRanking = 4;
    $scope.debug = 50;
    $scope.muchCommits = [];
    
    /**
     * Redirects on user page when a username is searched
     */
    $scope.clickUser = function(username){
        $scope.debug = username;
        localStorage.setItem("user", username);
        location.href = '/user.html';
    }

    /**
     * Gets hateful commits from a person
     */
    $scope.dirtyCommits = function (username){
        $http({
            method: "GET",
            url:"http://localhost:3000/dirtycommits/" + username
        })
           .then(function(response){
            $scope.muchCommits = response.data;
        }, function(response){
            $scope.muchCommits = response.statusText;
        }).catch(function(resp){console.log("Rejected promise (dirty commits)")});
    }


    /**
     * Get all the commits of a user
     */
    $scope.commits = function (username){
        $http({
            method: "GET",
            url:"http://localhost:3000/commits/" + username
        })
           .then(function(response){
            $scope.allCommits = response.data;
        }, function(response){
            $scope.allCommits = response.statusText;
            $scope.allCommits = 2;
        }).catch(function(){console.log("Rejected promise (commits)")});
    }
    

    /**
     * Gets a set of users, their dirty commits and calculates their rage score
     */
    $scope.allUsers = function(){
        $scope.scores = [];
        $scope.allPromises = [];
        $http({
            method: "GET",
            url:"http://localhost:3000/users"
        })
           .then(function(response){
            $scope.tableCommits = [];
            $scope.users = response.data;

            // iterates on all the users in the set
            for(let i = 0; i < $scope.users.length; ++i){
                let promise = $http({
                    method: "GET",
                    url:"http://localhost:3000/dirtycommits/" + $scope.users[i].login
                })
                   .then(function(response){
                        $scope.score;
                        $scope.muchCommits = response.data;
                        // if there are no dirty commits, score is 0
                        if($scope.muchCommits.items.length == 0){
                            $scope.score = 0;
                        }else{
                            // if total commits is more than 1000, other commits because github
                            // doesn't allow to get more than 1000
                            $scope.nbCommits = $scope.muchCommits.total_count > 1000 ? 1000 : $scope.muchCommits.total_count;
                            // calculate the score
                            $scope.score = ($scope.muchCommits.items.length*100/$scope.nbCommits);
                            $scope.score = Math.ceil($scope.score*100/3.5);
                        }
                        // getting all scores in a table we will use for the charts
                        $scope.scores.push($scope.score);

                        // inserts information in a tables
                        $scope.tableCommits.push({"login" : $scope.users[i].login, "score" : $scope.score, "items" : $scope.muchCommits.items});

                        return;
                }, function(response){
                    $scope.muchCommits = response.statusText;
                })
                
                .catch(function(resp){console.log("Rejected promise (dirty commits)")});
                // keeps promises in a table in order to wait for them later
                $scope.allPromises.push(promise);
            }
            // waiting for all the promises resolution before executing rest of the code
            return Promise.all($scope.allPromises);
            //console.log($scope.muchCommits);
        }, function(response){
            $scope.users = response.statusText;
        }).then(function(){
            // sorting score
            $scope.scores.sort(function(a, b){return b-a});
            // displaying score through the charts
            loadLiquidFillGauge("fillgauge2", $scope.scores[0]);
            loadLiquidFillGauge("fillgauge3", $scope.scores[1]);
            loadLiquidFillGauge("fillgauge4", $scope.scores[2]);
            loadLiquidFillGauge("fillgauge5", $scope.scores[3]);
            loadLiquidFillGauge("fillgauge6", $scope.scores[4]);
        })
        .catch(function(){console.log("Rejected promise (all users)")});

    }

    $scope.allUsers();
   
   });

