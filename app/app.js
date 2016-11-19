(function(){
    angular.module("leagueOfScrubs",["ui.router"])
        .config(function($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: "app/home/home.html",
                    controller: "HomeController"
                })
        })
}());