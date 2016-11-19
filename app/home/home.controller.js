(function(){
    angular.module("leagueOfScrubs")
    .controller("HomeController",["$scope", "$state", "$http", function($scope, $state, $http){
        $scope.action = "Create";
        $scope.submitForm = function (action) {
            if (action == "Create") {
                var form = { name: $scope.gameName };
                $http.post("/api/game", form).success(function(data){
                    $('#configure').modal('hide');
                    $('body').removeClass('modal-open');
                    $state.go("dataEntry", {"gameKey": data.key});
                }).error(function(data){
                    alert("Error");
                });
            } else {

            }
        }
    }]);
}());
