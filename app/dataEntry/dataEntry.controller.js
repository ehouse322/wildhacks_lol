(function(){
    angular.module("leagueOfScrubs")
    .controller("DataEntryController",["$scope", "$state", "$stateParams", "$http", "$interval", function($scope, $state, $stateParams, $http, $interval){
        $scope.gameKey = $stateParams.gameKey;
        $scope.summonerPosition = ["Top","Jungle","Mid","ADC","Support"];
        $scope.game = {};
        $scope.$on("$destroy", function(){
            $interval.cancel($scope.timer);
            $scope.timer = undefined;
        });
        $scope.timer = $interval(function(){
            if (!$scope.game.endTime && $scope.game.startTime) {
                var current = new Date();
                if (typeof($scope.game.startTime) != "object") {
                    $scope.game.startTime = new Date($scope.game.startTime);
                }
                var ms = current - $scope.game.startTime;
                getTimeValues(ms);
            }
        }, 1000);
        $http.get("/api/game/gameKey/" + $stateParams.gameKey).success(function(data) {
            if (data.length){
                $scope.game = data[0];
                if ($scope.game.startTime && $scope.game.endTime) {
                    var begin =  new Date($scope.game.startTime);
                    var end = new Date($scope.game.endTime);
                    getTimeValues(end-begin);
                }
            } else {
                $state.go("home");
            }
        }).error(function(data){
            $state.go("home");
        });
        $scope.startGame = function (game) {
            game.startTime = new Date();
            $scope.saving = true;
            $http.put("/api/game", game).success(function(data){
                window.setTimeout(function() {
                    $scope.saving = false;
                    $scope.$apply();
                }, 500);
            });
        }
        $scope.updateDB = function () {
            $scope.saving = true;
            getWinPercentage();
            $http.put("/api/game", $scope.game).success(function(){
                window.setTimeout(function() {
                    $scope.saving = false;
                    $scope.$apply();
                }, 500);
            });
        }
        $scope.winner = function (team) {
            $scope.saving = true;
            $scope.game.endTime = new Date();
            $scope.game.winner = team;
            $scope.game[team].winPercentage = 100;
            $scope.game[getOpponent(team)].winPercentage = 0;
            var val = { time: new Date,  percent: (team == 'red') ? 100 : 0};
            $scope.game.red.winPercentageList.push(val);
            $interval.cancel($scope.timer);
            $scope.timer = undefined;
            $http.put("/api/game", $scope.game).success(function(){
                window.setTimeout(function() {
                    $scope.saving = false;
                    $scope.$apply();
                }, 500);
            });
        }
        $scope.updateValue = function (summoner, stat, team) {
            summoner[stat]++;
            if (stat == "kills") {
                $scope.game[team].kills++;
            }
            $scope.saving = true;
            getWinPercentage($scope.game);
            $http.put("/api/game", $scope.game);
            var obj = {
                timestamp:  new Date(),
                entity:     summoner.name,
                gameID:     $scope.game._id,
                team:       team,
                stat:       stat,
                value:      summoner[stat]
            };
            $http.post("/api/event", obj).success(function(data){
                window.setTimeout(function() {
                    $scope.saving = false;
                    $scope.$apply();
                }, 500);
            });
        }
        $scope.updateTeam = function (team, stat) {
            $scope.game[team][stat]++;
            $scope.saving = true;
            getWinPercentage($scope.game);
            $http.put("/api/game", $scope.game);
            var obj = {
                timestamp:  new Date(),
                entity:     "team",
                gameID:     $scope.game._id,
                team:       team,
                stat:       stat,
                value:      $scope.game[team][stat]
            };
            $http.post("/api/event", obj).success(function(data){
                window.setTimeout(function() {
                    $scope.saving = false;
                    $scope.$apply();
                }, 500);
            });
        }
        var getTimeValues = function (ms) {
            var values = {
                seconds : parseInt(ms / 1000) % 60,
                minutes : parseInt(ms / (1000*60)) % 60,
                hours : parseInt(ms / (1000*60*60)) % 24
            };
            var string = "";
            string += ((Math.floor(values.hours / 10) == 0) ? "0" + values.hours : values.hours) + ":";
            string += ((Math.floor(values.minutes / 10) == 0) ? "0" + values.minutes : values.minutes) + ":";
            string += (Math.floor(values.seconds / 10) == 0) ? "0" + values.seconds : values.seconds;
            $scope.gameLength = string;
        }
        var getWinPercentage = function (game) {
            var red = $scope.game.red;
            var blue = $scope.game.blue;
            var bSum = blue.kills + blue.towers + blue.barons + blue.dragons + blue.gold - red.gold;
            var rSum = red.kills + red.towers + red.barons + red.dragons + red.gold - blue.gold;
            var tSum = bSum + rSum;
            var bGoldweight = 0;
            if (Math.abs(blue.gold - red.gold) < 0.49) {
                bGoldWeight = blue.gold - red.gold * 0.49
            } else if (Math.abs(blue.gold - red.gold) < 1.49) {
                bGoldWeight = blue.gold - red.gold * 1.2
            } else {
                bGoldWeight = blue.gold - red.gold * 2
            }
            var rGoldWeight = 0;
            if (Math.abs(red.gold - blue.gold) < 0.6) {
                rGoldWeight = red.gold - blue.gold * 0.6
            } else if (Math.abs(red.gold - blue.gold) < 1.5) {
                rGoldWeight = red.gold - blue.gold * 1.3
            } else {
                rGoldWeight = red.gold - blue.gold * 2
            }
            var bScore;
            var rScore;
            if (tSum < 3 && bSum > rSum) {
                bScore = 1,
                rScore = 0.65
            } else if (tSum < 3 && rSum > bSum) {
                rscore = 1,
                bScore = 0.65
            } else if (tSum < 10) {
                bScore = (blue.kills + (blue.towers * 1.4) + (blue.barons * 2.5) + (blue.dragons * 1.2) + blue.gold - red.gold) * 0.75   
                rScore = (red.kills + (red.towers * 1.4) + (red.barons * 2.5) + (red.dragons * 1.2) + red.gold - blue.gold) * 0.75
            } else if (tSum < 20) {
                bScore = (blue.kills + (blue.towers * 1.7) + (blue.barons * 2.8) + (blue.dragons * 1.3) + blue.gold - red.gold) * 2  
                rScore = (red.kills + (red.towers * 1.7) + (red.barons * 2.8) + (red.dragons * 1.3) + red.gold - blue.gold) * 2
            } else {
                bScore = ((blue.kills * 2) + (blue.towers * 6) + (blue.barons * 10) + (blue.dragons * 2) + (blue.gold - red.gold))
                rScore = ((red.kills * 2) + (red.towers * 6) + (red.barons * 10) + (red.dragons * 2) + (red.gold - blue.gold))
            }
            blue.winPercentage = Math.floor(bScore/(bScore+rScore)*100); // Calculate blue side chance of winning
            red.winPercentage = Math.floor(rScore/(bScore+rScore)*100); // Calculate red side chance of winning
            var time = new Date();
            red.winPercentageList.push({time: time, percent: red.winPercentage});
        }
        function getOpponent(team) {
            return team == 'red' ? 'blue' : 'red';
        }
    }]);
}());