angular.module('user', ["chart.js"])
.controller('userCtrl', function ($scope, $locale, $http) {
    
  



        if(null === localStorage.getItem("user") || angular.isUndefined(localStorage.getItem("user"))){
            localStorage.setItem("user", "octocat");
        }


        $scope.zenImage = Math.floor((Math.random() * 4) + 1);
        $scope.imgUrl = "url(img/zen/" + $scope.zenImage + ".jpg)";
        $scope.myStyle = {
            "background-image" : $scope.imgUrl
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

        function onlyUnique(value, index, self) { 
            return self.indexOf(value) === index;
        }
        
        $scope.dirtyCommits = function (username){
            $scope.years = [];
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
                    for(let i = 0; i < $scope.muchCommits.items.length; ++i){
                        $scope.years.push($scope.muchCommits.items[i].commit.author.date.substring(0,4));
                    }
                }
            }, function(response){
                $scope.muchCommits = response.statusText;
                $scope.muchCommits = 2;
            }).then(function(){
                $scope.years.sort(function(a, b){return a-b});
                $scope.years = $scope.years.filter(onlyUnique);
                $scope.occurences = [];
                console.log($scope.years);
                for(let j = 0; j < $scope.years.length; ++j){
                    $scope.occurences[j] = 
                        ($scope.muchCommits.items.filter(function(i,n){
                            console.log(i.commit.author.date.substring(0,4));
                            console.log("year: " + $scope.years[j]);
                            return i.commit.author.date.substring(0,4) === $scope.years[j];
                        })).length;
                }
                console.log($scope.occurences);
                $scope.labels = $scope.years;
                $scope.series = ['Commits'];
                $scope.data = [
                    $scope.occurences
                ];
                $scope.onClick = function (points, evt) {
                    console.log(points, evt);
                };
                $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
                $scope.options = {
                    scales: {
                    yAxes: [
                        {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                        }
                    ]
                    }
                };

            })
            
            .catch(function(){console.log("Rejected promise")})
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

       $scope.backToIndex = function(){
        location.href = '/';
       }


    });

