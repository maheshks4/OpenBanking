'use strict';

angular
    .module('app.services')
    .constant('OBP_BASE_URL', 'https://socgen-k-api.openbankproject.com/obp/v3.0.0')
    .factory('OpenBankingService', dataService);

function dataService($http, $log, PageValues, moment, OBP_BASE_URL) {
    var data = {
        'doAuth' : doAuth,
        'getBanks' : getBanks,
        'getBankAtms' : getBankAtms,
        'getBankRoles' : getBankRoles,
        'getBankProducts' : getBankProducts,
        'createAccount' : createAccount,
        'createBranch': createBranch 
    };

    function doAuth(url, params) {
        var requestUrl = "https://socgen-k-api.openbankproject.com/my/logins/direct";
        return $http({
            'url': requestUrl,
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'DirectLogin username="1000203893", password="123456",consumer_key="htda4jl0ylwaksrf5zoeuv5u3p3o0wk2slpsngti"'
            }
        }).then(function(response){
            return response.data;
        }).catch(dataServiceError);
    }

    function makeGet(url) {
        var requestUrl = OBP_BASE_URL + '/' + url;
        return $http({
            'url': requestUrl,
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'DirectLogin token="'+ PageValues.obpkey +'"'
            }
        }).then(function(response){
            return response.data;
        }).catch(dataServiceError);
    }

    function makePost(url) {
        var requestUrl = OBP_BASE_URL + '/' + url;
        return $http({
            'url': requestUrl,
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'DirectLogin token="'+ PageValues.obpkey +'"'
            }
        }).then(function(response){
            return response.data;
        }).catch(dataServiceError);
    }

    function makePostWithData(url, data) {
        var requestUrl = OBP_BASE_URL + '/' + url;
        return $http({
            'url': requestUrl,
            'method': 'POST',
            'data': data,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'DirectLogin token="'+ PageValues.obpkey +'"'
            }
        }).then(function(response){
            return response.data;
        }).catch(dataServiceError);
    }

    function makePutWithData(url, data) {
        var requestUrl = OBP_BASE_URL + '/' + url;
        return $http({
            'url': requestUrl,
            'method': 'PUT',
            'data': data,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'DirectLogin token="'+ PageValues.obpkey +'"'
            }
        }).then(function(response){
            return response.data;
        }).catch(dataServiceError);
    }

    function getBanks(){
        return makeGet('banks');
    }

    function getBankRoles(){
        return makeGet('roles');
    }

    function getBankAtms(bankId){
        return makeGet('banks/'+bankId+'/atms');
    }

    function createBranch(bankId, branchData){
        return makePostWithData('banks/'+bankId+'/branches', branchData);
    }
    
    function getBankProducts(bankId){
        return makeGet('banks/'+bankId+'/products');
    }

    function createAccount(bankId, accId, accData){
        return makePutWithData('banks/' + bankId + '/accounts/' + accId, accData);
    }

    function dataServiceError(errorResponse) {
        $log.error('XHR Failed for OpenBankingService');
        $log.error(errorResponse);
        return errorResponse;
    }

    return data;
}