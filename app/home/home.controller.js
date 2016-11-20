(function(){
    angular.module("leagueOfScrubs")
    .controller("HomeController",["$scope", "$state", "$http", function($scope, $state, $http){
        $scope.action = "Create";
        $scope.submitForm = function (action) {
            if (action == "Create") {
                var champions = [0,1,2,3,4].map(function(num){
                    return {kills:0, deaths:0, assists:0};
                });
                var data = {
                    name: undefined,
                    barons: 0,
                    dragons: 0,
                    towers: 0,
                    gold: 0,
                    kills: 0, 
                    summoners: champions
                };
                var form = { name: $scope.gameName, red: data, blue: data };
                $http.post("/api/game", form).success(function(data){
                    $('#configure').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').hide();
                    $state.go("dataEntry", {"gameKey": data.key});
                }).error(function(data){
                    alert("Error");
                });
            } else {
                $http.get("/api/game/" + $scope.gameKey).success(function(data){
                    if (data.length) {
                        $('#configure').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').hide();
                        $state.go("dataEntry", {"gameKey": $scope.gameKey});
                    } else {
                        alert("Bad Key");
                    }
                })                
            }
        }
    }]);
}());
