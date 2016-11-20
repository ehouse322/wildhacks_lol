(function(){
    angular.module("leagueOfScrubs")
    .controller("GameController",["$scope", "$state", "$http", "$stateParams", "$interval", function($scope, $state, $http, $stateParams, $interval){
        $scope.id = $stateParams.id;
        $scope.$on("$destroy", function(){
            $interval.cancel(interval);
            interval = undefined;
        });
        $scope.game = {};
        var getData = function(){
            $http.get("/api/game/" + $scope.id).success(function(data){
                $scope.game = data[0];
                if ($scope.game.startTime && $scope.game.endTime) {
                    $interval.cancel(interval);
                    interval = undefined;
                }
                var redDataSet = data[0].red.winPercentageList.map(function(data){
                    return {
                        x: new Date(data.time),
                        y: data.percent
                    };
                });
                var blueDataSet = data[0].red.winPercentageList.map(function(data){
                    return {
                        x: new Date(data.time),
                        y: 100 - data.percent
                    };
                })
                var ctx = document.getElementById("myChart");
                var scatterChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        datasets: [{
                            label: 'Red Win Probability',
                            data: redDataSet,
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'rgba(255,105,97,1)',
                            pointBackgroundColor: 'rgba(255,105,97,1)',
                            pointBorderColor: 'rgba(255,105,97,1)'
                        },{
                            label: 'Blue Win Probability',
                            data: blueDataSet,
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'rgba(102,153,204,1)',
                            pointBackgroundColor: 'rgba(102,153,204,1)',
                            pointBorderColor: 'rgba(102,153,204,1)' 
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                type: 'time',
                                time: {
                                    displayFormats: {
                                        quarter: 'SSS [ms]'
                                    }
                                }
                            }]
                        }
                    }
                });
            });
        }
        getData();
        var interval = $interval(getData(), 3000);
    }]);
}());