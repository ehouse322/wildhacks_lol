(function(){
    angular.module("leagueOfScrubs")
    .controller("HomeController",["$scope", "$state", "$http", function($scope, $state, $http){
        $scope.getGames = function (summonerName, region) {
            var url = "/api/usergames/" + summonerName + "/" + region;
            $http.get(url).success(function(data){
                console.log(data);
            });
        }
    }]);
}());
