(function(){
    angular.module("leagueOfScrubs",["ui.router","chart.js"])
        .config(function($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: "app/home/home.html",
                    controller: "HomeController"
                })
                .state("game", {
                    url: "/game/:id",
                    templateUrl: "app/game/game.html",
                    controller: "GameController"
                })
                .state("dataEntry", {
                    url: "/dataEntry/:gameKey",
                    templateUrl: "app/dataEntry/dataEntry.html",
                    controller: "DataEntryController"
                })
        })
}());