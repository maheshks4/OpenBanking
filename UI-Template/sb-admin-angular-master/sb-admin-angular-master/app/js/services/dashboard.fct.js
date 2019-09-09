angular
    .module('inspinia')
    .factory('DashboardOBPService', DashboardOBPService)
    .constant('DASH_BASE_URL', 'http://176.23.103.112:8080')

function DashboardOBPService($http, $log, PageValues, DASH_BASE_URL) {
    var data = {
        'getUserBanks' : getUserBanks,
        'getTransactionStats' : getTransactionStats,
        'getUserTrans' : getUserTrans
    };

    function makeGet(url) {
        var requestUrl = DASH_BASE_URL + '/' + url;
        return $http({
            'url': requestUrl,
            'method': 'GET'
        }).catch(dataServiceError);
    }

    function makePost(url) {
        var requestUrl = DASH_BASE_URL + '/' + url;
        return $http({
            'url': requestUrl,
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            }
        }).catch(dataServiceError);
    }

    function makePostWithData(url, data) {
        var requestUrl = DASH_BASE_URL + '/' + url;
        $http({
            'url': requestUrl,
            'method': 'POST',
            'data': data,
            'headers': {
                'Content-Type': 'application/json'
            }
        }).then(function(response){
            return response.data;
        }).catch(dataServiceError);
    }

    function getUserBanks(username){
        return makeGet('user/' + username);
    }

    function getTransactionStats(username){
        return makeGet('user/' + username + '/saving/1');
    }

    function getUserTrans(username, type, days){
        return makeGet('user/' + username + '/transaction/' + type + '/' + days);
    }

    function dataServiceError(errorResponse) {
        $log.error('XHR Failed for OpenBankingService');
        $log.error(errorResponse);
        return errorResponse;
    }

    return data;
}