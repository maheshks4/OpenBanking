'use strict';
angular
    .module('app.core')
    .controller('BanksController', function($scope, OpenBankingService, PageValues) {
        //Set page title and description
        PageValues.title = "Banks";
        PageValues.description = "Listing All Banks";
        //Setup view model object
        var vm = this;

        vm.banksList = [];
        vm.atmList = [];
        vm.productList = [];

        $scope.banksInit = function(){
            $scope.getBanks();
            $scope.createBranch();
            //$scope.createAccount();
        };

        $scope.getBanks = function(){
            OpenBankingService.getBanks().then(function(response){
                vm.banksList  = response.banks;
            });
        };

        $scope.getRoles = function(){
            OpenBankingService.getRoles().then(function(response){
                console.log(response);
            });
        };

		$scope.createBranch = function(){
			var bankId = 'rbs';
			var data = {  "id":"123",  "bank_id":"gh.29.uk",  "name":"OBP",  "address":{    "line_1":"Berlin",    "line_2":"Berlin",    "line_3":"Berlin",    "city":"Berlin",    "state":"Berlin",    "postcode":"123",    "country":"Germany"  },  "location":{    "latitude":11.45,    "longitude":11.45  },  "meta":{    "license":{      "id":"5",      "name":"TESOBE"    }  },  "lobby":{    "hours":"5"  },  "drive_up":{    "hours":"5"  },  "branch_routing":{    "scheme":"String",    "address":"String"  }} 
            OpenBankingService.createBranch(bankId, data).then(function(response){
                console.log(response);
            });
        };

        $scope.createAccount = function(){
			var bankId = 'rbs';
			var accId = 'test1234';
			var data = {  "user_id":"247f4cf0-aca5-48d0-bf1a-4d20d32ce6ba",  "label":"Label",  "type":"CURRENT",  "balance":{    "currency":"EUR",    "amount":"0"  },  "branch_id":"1234",  "account_routing":{    "scheme":"OBP",    "address":"UK123456"  }}
            OpenBankingService.createAccount(bankId, accId, data).then(function(response){
                console.log(response);
            });
        };        

        $scope.getBankAtms = function(bankId){
            OpenBankingService.getBankAtms(bankId).then(function(response){
                vm.atmList  = response.atms;
                $('#myModal').modal('show');

                setTimeout(function(){
	                var map = new GMaps({
				      el: '#map',
				      lat: 12.9858635,
				      lng: 77.7581174
				    });
				    map.addMarker({
					  lat: 12.985573,
				      lng: 77.756756,
					  title: 'Home'
					});
				   	map.addMarker({
					  lat: 12.9822748,
				      lng: 77.7376163,
					  title: 'Societe Generale'
					});
				    for(var i = 0; i< vm.atmList.length; i++){
				    	map.addMarker({
						  lat: vm.atmList[i].location.latitude,
					      lng: vm.atmList[i].location.longitude,
						  title: vm.atmList[i].name
						});
				    }

                }, 1000);
                console.log(vm.atmList);
            });
        };


        $scope.getBankProducts = function(bankId){
            OpenBankingService.getBankProducts(bankId).then(function(response){
                vm.productList  = response.products;
                $('#myProductModal').modal('show');             
                console.log(vm.productList);
            });
        };

    });