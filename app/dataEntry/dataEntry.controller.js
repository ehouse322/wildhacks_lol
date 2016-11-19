(function(){
    angular.module("leagueOfScrubs")
    .controller("DataEntryController",["$scope", "$state", "$stateParams", "$http", function($scope, $state, $stateParams, $http){
        $http.get("/api/game/" + $stateParams.gameKey).success(function(data) {
            // alert(data);
        })
    }]);
}());