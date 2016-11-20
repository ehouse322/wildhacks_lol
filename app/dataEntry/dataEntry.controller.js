(function(){
    angular.module("leagueOfScrubs")
    .controller("DataEntryController",["$scope", "$state", "$stateParams", "$http", function($scope, $state, $stateParams, $http){
        $scope.gameKey = $stateParams.gameKey;
        $scope.summonerPosition = ["Top","Jungle","Mid","ADC","Support"];
        $http.get("/api/game/" + $stateParams.gameKey).success(function(data) {
            if (data.length){
                $scope.game = data[0];
            } else {
                $state.go("home");
            }
        }).error(function(data){
            $state.go("home");
        });
        $scope.startGame = function (game) {
            game.startTime = new Date();
            $http.put("/api/game", game);
        }
        $scope.endGame = function (game) {
            game.endTime = new Date();
            $http.put("/api/game", game);
        }
        $scope.updateDB = function () {
            $http.put("/api/game", $scope.game);
        }
        $scope.updateValue = function (summoner, stat, team) {
            summoner[stat]++;
            $http.put("/api/game", $scope.game);
            var obj = {
                timestamp:  new Date(),
                entity:     summoner.name,
                gameID:     $scope.game._id,
                team:       team,
                stat:       stat,
                value:      summoner[stat]
            };
            $http.post("/api/event", obj);
        }
        $scope.updateTeam = function (team, stat) {
            $scope.game[team][stat]++;
            $http.put("/api/game", $scope.game);
            var obj = {
                timestamp:  new Date(),
                entity:     "team",
                gameID:     $scope.game._id,
                team:       team,
                stat:       stat,
                value:      $scope.game[team][stat]
            };
            $http.post("/api/event", obj);
        }
    }]);
}());