'use strict';
angular
    .module('app.core')
    .controller('HomeController', function($scope, OpenBankingService, PageValues) {
        //Set page title and description
        PageValues.title = "HOME";
        PageValues.description = "Bank as a platform. Transparency as an asset.";
        //Setup view model object
        var vm = this;
        vm.benefits = [
            {
                title: "For Banks",
                description: "Bring innovation to your door and quickly deliver a greater range of apps and services.",
                link: "https://openbankproject.com/for-banks/"
            },
            {
                title: "For Developers",
                description: "Build the next generation of banking apps and deploy to a wide range of banks.",
                link: "https://openbankproject.com/for-developers/"
            },
            {
                title: "For Customers",
                description: "Enjoy a wide range of banking applications that address your needs and appeals to you!",
                link: "https://openbankproject.com/for-customers"
            },
            {
                title: "For Society",
                description: "Raise the bar of financial transparency and unlock an untapped innovation potential.",
                link: "https://openbankproject.com/for-society/"
            }
        ];

        $scope.homeInit = function(){
            // OpenBankingService.doAuth().then(function(response){
            //     PageValues.obpkey = response.token;
            // });
        };
    });
