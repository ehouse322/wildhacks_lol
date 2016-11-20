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
            $scope.gameLength = {};
            $scope.gameLength.seconds = parseInt(ms / 1000) % 60 ;
            $scope.gameLength.minutes = parseInt(ms / (1000*60)) % 60;
            $scope.gameLength.hours = parseInt(ms / (1000*60*60)) % 24;
        }
        var getWinPercentage = function (game) {
            var funcs = [ function (kda){
                var k;
                var d;
                var a = 0.1;
                if (kda.kills<3){
                    k = 1;
                } else if (kda.kills<6){
                    k = 0.9;
                } else {
                    k = 0.8;
                }
                if (kda.deaths<3){
                    d = -0.5;
                } else if (kda.deaths<6){
                    d = -0.4;
                } else {
                    d = -0.35;
                }
                return kda.kills*k + kda.deaths*d + kda.assists*a;
            }, function (kda){
                var k;
                var d;
                var a;
                if (kda.kills<3){
                    k = 1.2;
                } else if (kda.kills<6){
                    k = 1.1;
                } else {
                    k = 1.0;
                }
                if (kda.deaths<3){
                    d = -0.4;
                } else {
                    d = -0.3;
                }
                if (kda.assists<4){
                    a = 0.2;
                } else {
                    a = 0.17;
                }
                return kda.kills*k + kda.deaths*d + kda.assists*a;
            }, function (kda){
                var k;
                var d;
                var a = 0.1;
                if (kda.kills<3){
                    k = 1.3;
                } else if (kda.kills<6){
                    k = 1.1;
                } else {
                    k = 1.0;
                }
                if (kda.deaths<3){
                    d = -0.6;
                } else if (kda.deaths<6){
                    d = -0.5;
                } else {
                    d = -0.45;
                }
                return kda.kills*k + kda.deaths*d + kda.assists*a;
            }, function (kda){
                var k;
                var d;
                var a = 0.1;
                if (kda.kills<3){
                    k = 1.4;
                } else if (kda.kills<6){
                    k = 1.2;
                } else {
                    k = 1.1;
                }
                if (kda.deaths<3){
                    d = -0.6;
                } else if (kda.deaths<6){
                    d = -0.5;
                } else {
                    d = -0.45;
                }
                return kda.kills*k + kda.deaths*d + kda.assists*a;
            }, function (kda){
                var k;
                var d;
                var a;
                if (kda.kills<3){
                    k = 0.7;
                } else if (kda.kills<6){
                    k = 0.6;
                } else {
                    k = 0.55;
                }
                if (kda.deaths<3){
                    d = -0.3;
                } else if (kda.deaths<6){
                    d = -0.25;
                } else {
                    d = -0.3;
                }
                if (kda.assists<4){
                    a = 0.7;
                } else if (kda.assists<8){
                    a = 0.6;
                } else {
                    a = 0.55;
                }
                return kda.kills*k + kda.deaths*d + kda.assists*a;
            }]
            var red = $scope.game.red;
            var blue = $scope.game.blue;
            var redValue = red.summoners.reduce(function(accum, current, i){
                return accum + funcs[i].call(undefined, current);
            }, 0);
            var blueValue = blue.summoners.reduce(function(accum, current, i){
                return accum + funcs[i].call(undefined, current);
            }, 0);
            redValue += gold_calc(red.gold) + tower_calc(red.towers) + drag_calc(red.dragons) + baron_calc(red.barons);
            blueValue += gold_calc(blue.gold) + tower_calc(blue.towers) + drag_calc(blue.dragons) + baron_calc(blue.barons);
            blue.winPercentage = Math.floor(blueValue/(blueValue+redValue)*100); // Calculate blue side chance of winning
            red.winPercentage = Math.floor(redValue/(blueValue+redValue)*100); // Calculate red side chance of winning
            var time = new Date();
            red.winPercentageList.push({time: time, percent: red.winPercentage});
        }
        
        function gold_calc(gold){
            if (gold < 50) {
                return gold*3;
            } else {
                return gold*2.95;
            }
        }
        function tower_calc(towers) {
            var t;
            if (towers<2) {
                t = 5;
            } else if (towers <7){
                t = 3;
            } else if (towers < 10) {
                t = 3.5;
            } else {
                t = 3.8;
            }
            return towers*t;
        }
        function drag_calc(dragons) {
            return dragons*4;
        }
        function baron_calc(barons) {
            return barons*8;
        }
        function getOpponent(team) {
            return team == 'red' ? 'blue' : 'red';
        }
    }]);
}());