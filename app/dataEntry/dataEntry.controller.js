(function(){
    angular.module("leagueOfScrubs")
    .controller("DataEntryController",["$scope", "$state", "$stateParams", "$http", function($scope, $state, $stateParams, $http){
        $scope.gameKey = $stateParams.gameKey;
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
        $scope.updateDB = function() {
            $http.put("/api/game", $scope.game).success( function(data) {
                alert("Saved.");
            })
        }
    }]);
}());