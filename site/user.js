angular.module('user', ["chart.js"])
    .controller('userCtrl', function ($scope, $locale, $http) {
        // if user access this page without selecting a user, displays octocat info
        if (null === localStorage.getItem("user") || angular.isUndefined(localStorage.getItem("user"))) {
            localStorage.setItem("user", "octocat");
        }

        // changes jumbotron background image at every refresh
        $scope.rageImage = Math.floor((Math.random() * 8) + 1);
        $scope.rageImgUrl = "url(img/rage/" + $scope.rageImage + ".jpg)";
        $scope.congratImgUrl = "url(img/fireworks.jpg)";
        

        /**
         * gets info of selected user
         */
        $scope.usersInfo = function (username) {
            $http({
                method: "GET",
                url: "http://localhost:3000/users/" + username
            })
                .then(function (response) {

                    $scope.thisUser = response.data;
                }, function (response) {
                    $scope.thisUser = response.statusText;
                }).catch(function () { console.log("Rejected promise") })
        }

        /**
         * makes unique each element of an array
         * source: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates#14438954
         */
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        /**
         * gets dirty commits of a user and display info in charts
         */
        $scope.dirtyCommits = function (username) {
            $scope.years = [];
            $scope.repos = [];
            $http({
                method: "GET",
                url: "http://localhost:3000/dirtycommits/" + username
            })
                .then(function (response) {
                    $scope.muchCommits = response.data;
                    // if no dirty commits, user is clean
                    if ($scope.muchCommits.items.length == 0) {
                        $scope.randomMessage = "This user has a clean mouth!";
                        $scope.cleanUser = true;
                        $scope.myStyle = {
                            "background-image": $scope.congratImgUrl
                        }
                    } else {
                        $scope.cleanUser = false;
                        // getting a random dirty message as user quotation in jumbotron
                        $scope.rd = Math.floor((Math.random() * ($scope.muchCommits.items.length - 1)));
                        $scope.randomMessage = $scope.muchCommits.items[$scope.rd].commit.message;
                        // getting user score
                        $scope.nbCommits = $scope.muchCommits.total_count > 1000 ? 1000 : $scope.muchCommits.total_count;
                        $scope.score = ($scope.muchCommits.items.length * 100 / $scope.nbCommits);
                        $scope.score = Math.ceil($scope.score * 100 / 3);
                        // filling chart
                        loadLiquidFillGauge("fillgauge", $scope.score);
                        // getting years when dirty commits were actually commited

                        for (let i = 0; i < $scope.muchCommits.items.length; ++i) {
                            $scope.years.push($scope.muchCommits.items[i].commit.author.date.substring(0, 4));
                            $scope.repos.push($scope.muchCommits.items[i].repository.name);
                        }
                        $scope.myStyle = {
                            "background-image": $scope.rageImgUrl
                        }
                    }
                }, function (response) {
                    $scope.muchCommits = response.statusText;
                }).then(function () {
                    // sorting years (ascendant)
                    $scope.years.sort(function (a, b) { return a - b });
                    // keeping 1 occurence of each year
                    $scope.years = $scope.years.filter(onlyUnique);
                    $scope.repos = $scope.repos.filter(onlyUnique);

                    $scope.occurences = [];
                    $scope.occurencesRepos = [];

                    // getting number of dirty commits for each year
                    for (let j = 0; j < $scope.years.length; ++j) {
                        $scope.occurences[j] =
                            ($scope.muchCommits.items.filter(function (i, n) {
                                return i.commit.author.date.substring(0, 4) === $scope.years[j];
                            })).length;
                    }

                    for (let j = 0; j < $scope.repos.length; ++j) {
                        $scope.occurencesRepos[j] =
                            ($scope.muchCommits.items.filter(function (i, n) {
                                return i.repository.name === $scope.repos[j];
                            })).length;
                    }

                    // filling line chart
                    $scope.labels = $scope.years;
                    $scope.series = ['Dirty commits'];
                    $scope.data = [
                        $scope.occurences
                    ];

                    $scope.labels2 = $scope.repos;
                    $scope.series2 = ['Dirty commits'];
                    $scope.data2 = [
                        $scope.occurencesRepos
                    ];

                    $scope.onClick = function (points, evt) {
                        console.log(points, evt);
                    };
                    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
                    $scope.colors = [{
                        backgroundColor: '#ff0000',
                        pointBackgroundColor: '##990000'
                    }];

                    $scope.colors2 = [{
                        backgroundColor: '#000000',
                        pointBackgroundColor: '#ff0000'
                    }];

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

                .catch(function () { console.log("Rejected promise") })
        }


        $scope.usersInfo(localStorage.getItem("user"));
        $scope.dirtyCommits(localStorage.getItem("user"));

        $scope.backToIndex = function () {
            location.href = '/';
        }


    });

