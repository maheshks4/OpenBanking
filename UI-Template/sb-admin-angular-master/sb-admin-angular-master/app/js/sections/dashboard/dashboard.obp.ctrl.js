angular
.module('inspinia')
.controller('DashboardOBPController', DashboardOBPController);

function DashboardOBPController($scope, $rootScope, DashboardOBPService, RootValues) {
    RootValues.username = "NSE User";
    $scope.bankSelected = "Citi";
    $scope.TransType = "out";
    $scope.transDays = 1;
    $scope.autoAcc = true;
    $scope.userBanks = [];
    $scope.userTrans = [];
    $scope.userName = RootValues.username;
    $scope.userCounterty = RootValues.username;
    $scope.TransactionStats = {};
    $scope.dashboardInit = function(){
        DashboardOBPService.getUserBanks($scope.userName).then(function(response){
          $scope.userBanks =  response.data;
          if($scope.userBanks.length > 0){
            $scope.userCounterty = response.data[0].counterParty;
            $scope.getTrans(1);
            DashboardOBPService.getTransactionStats($scope.userCounterty).then(function(response){
                $scope.TransactionStats =  response.data;
            });
          }

        });
    };

    $scope.getTrans = function(days){
        DashboardOBPService.getUserTrans($scope.userCounterty, $scope.TransType, $scope.transDays).then(function(response){
            var userTrans =  response.data;
            for(var i =0; i< userTrans.length; i++){
                userTrans[i].creationTime = new Date(userTrans[i].creationTime);
            }
            $scope.userTrans = userTrans;
        });
    };

    $scope.getDayTrans = function(){
        $scope.transDays = 1;
        $scope.getTrans();
    };

    $scope.getWeekTrans = function(){
        $scope.transDays = 7;
        $scope.getTrans();
    };

    $scope.getMonthTrans = function(){
        $scope.transDays = 30;
        $scope.getTrans();
    };

    $scope.getInflowTrans = function(){
        $scope.TransType = 'in';
        $scope.getTrans();
    }

    $scope.getOutflowTrans = function(){
        $scope.TransType = 'out';
        $scope.getTrans();
    }

    $scope.getNettedTrans = function(){
        // $scope.TransType = 'out';
        // $scope.getTrans();

        DashboardOBPService.getUserTrans($scope.userCounterty, 'out', $scope.transDays).then(function(response){
            var userTransOut =  response.data;
            for(var i =0; i< userTransOut.length; i++){
                userTransOut[i].creationTime = new Date(userTransOut[i].creationTime);
            }
            DashboardOBPService.getUserTrans($scope.userCounterty, 'in', $scope.transDays).then(function(response){
                var userTransIn =  response.data;
                for(var i =0; i< userTransIn.length; i++){
                    userTransIn[i].creationTime = new Date(userTransIn[i].creationTime);
                }

                $scope.userTrans = userTransOut.concat(userTransIn); 
            });
        });

    }

}
