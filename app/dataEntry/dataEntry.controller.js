(function(){
    angular.module("leagueOfScrubs")
    .controller("DataEntryController",["$scope", "$state", "$stateParams", "$http", "$interval", function($scope, $state, $stateParams, $http, $interval){
        $scope.gameKey = $stateParams.gameKey;
        $scope.summonerPosition = ["Top","Jungle","Mid","ADC","Support"];
        $scope.game = {};
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
        $http.get("/api/game/" + $stateParams.gameKey).success(function(data) {
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
    }]);
}());