(function(){
    angular.module("leagueOfScrubs")
    .controller("GameController",["$scope", "$state", "$http", function($scope, $state, $http){
        // $scope.region = "na";
        // $scope.getChampInfo = function(championID) {
        //     var url = "/api/champs/" + championID
        //     window.location.href = url
        // }

        // $scope.getGames = function (summonerName, region) {
        //     $scope.gameInfo = undefined;
        //     var url = "/api/usergames/" + summonerName + "/" + region;
        //     $http.get(url).success(function(data){
        //         $scope.gameInfo = "success";
        //     }).error(function(data){
        //         $scope.gameInfo = "error";
        //     });
        // }
    }]);
}());