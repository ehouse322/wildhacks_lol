(function(){
    angular.module("leagueOfScrubs")
    .controller("HomeController",["$scope", "$state", "$http", function($scope, $state, $http){
        $scope.action = "Create";
        $scope.submitForm = function (action) {
            if (action == "Create") {
                var form = { name: $scope.gameName };
                $http.post("/api/game", form).success(function(data){
                    $('#configure').modal('hide');
                    alert("Created");
                }).error(function(data){
                    alert("Error");
                });
            } else {

            }
        }
    }]);
}());
