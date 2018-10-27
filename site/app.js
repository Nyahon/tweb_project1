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
            $scope.muchCommits = 2;
        }).catch(function(resp){console.log("Rejected promise (dirty commits)")});
    }


    
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
    

    $scope.allUsers = function(){
        $http({
            method: "GET",
            url:"http://localhost:3000/users"
        })
           .then(function(response){
            $scope.tableCommits = [];
            $scope.users = response.data;
            $scope.debug = $scope.users[0].login;
            for(let i = 0; i < $scope.users.length; ++i){
                $http({
                    method: "GET",
                    url:"http://localhost:3000/dirtycommits/" + $scope.users[i].login
                })
                   .then(function(response){
                        
                        $scope.muchCommits = response.data;
                        if($scope.muchCommits.items.length == 0){
                            $scope.score = 0;
                        }else{
                            $scope.nbCommits = $scope.muchCommits.total_count > 1000 ? 1000 : $scope.muchCommits.total_count;
                            $scope.score = ($scope.muchCommits.items.length*100/$scope.nbCommits);
                            $scope.score = Math.ceil($scope.score*100/3);
                        }
                        
                        console.log($scope.score);
                        $scope.tableCommits.push({"login" : $scope.users[i].login, "score" : $scope.score, "items" : $scope.muchCommits.items});
                        //$scope.users[i].push($scope.tableCommits);
                        console.log("coucou");
                        console.log("HEYO: " + $scope.tableCommits);
                }, function(response){
                    $scope.muchCommits = response.statusText;
                    $scope.muchCommits = 2;
                }).catch(function(resp){console.log("Rejected promise (dirty commits)")});
            }
            
            //console.log($scope.muchCommits);
        }, function(response){
            $scope.users = response.statusText;
            $scope.users = 2;
        })
        .catch(function(){console.log("Rejected promise (all users)")});

    }

    $scope.allUsers();


    $scope.init = function(){
        loadLiquidFillGauge("fillgauge2", 95);
        loadLiquidFillGauge("fillgauge3", 84);
        loadLiquidFillGauge("fillgauge4", 70);
        loadLiquidFillGauge("fillgauge5", 59);
        loadLiquidFillGauge("fillgauge6", $scope.debug);

    }

    $scope.init();
   /*
    $scope.calculateHate = function(users) {
        for(let i = 0; i < users.length; ++i){
            let usr = users[i];
            let hate = 2;
            console.log("loul");
            $scope.usersAndCommits.push(users[i].login);
            //let hate = ($scope.dirtyCommits(usr.login).items.length) * 100 / ($scope.commits(usr.login).total_count);
        }
        $scope.dirtyCommits($scope.usersAndCommits[3]);
        console.log("HOY: " + $scope.muchCommits.total_count);
    }
    console.log("u&c: " + $scope.usersAndCommits)
 
    console.log("HEYO");
    let res = [];
    var values = {name: 'misko', gender: 'male'};

    angular.forEach(values, function(value, key) {
        console.log("coucou");
        this.push(key + " : " + value);
    }, res);
    console.log("RESULT: " + res[0]);*/
    //$scope.debug = $scope.users;
    //$scope.debug = $scope.users[1];
    //$scope.calculateHate();
   
   });

