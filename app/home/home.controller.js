(function(){
    angular.module("leagueOfScrubs")
    .controller("HomeController",["$scope", "$state", "$http", function($scope, $state, $http){
    	$scope.region = "na";
        $scope.getGames = function (summonerName, region) {
        	$scope.gameInfo = undefined;
            var url = "/api/usergames/" + summonerName + "/" + region;
            $http.get(url).success(function(data){
            	$scope.gameInfo = "success";
                console.log(data);
            });
        }
    }]);
}());
