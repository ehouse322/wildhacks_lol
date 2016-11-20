(function(){
    angular.module("leagueOfScrubs")
    .controller("HomeController",["$scope", "$state", "$http", function($scope, $state, $http){
        $scope.action = "Create";
        $http.get("/api/game").success(function(data){
            $scope.games = data;
        })
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
                    gold: 2.5,
                    kills: 0,
                    winPercentage: 0,
                    winPercentageList: [],
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
                $http.get("/api/game/gameKey/" + $scope.gameKey).success(function(data){
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
        $scope.getGameInfo = function (game) {
            $state.go("game", {"id": game._id});
        }
    }]);
}());