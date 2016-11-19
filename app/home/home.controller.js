(function(){
    angular.module("leagueOfScrubs")
    .controller("HomeController",["$scope", "$state", "$http", function($scope, $state, $http){
        $scope.name = "Scrubs";
    }]);
}());
