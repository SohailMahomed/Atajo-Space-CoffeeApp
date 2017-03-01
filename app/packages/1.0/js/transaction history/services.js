module.factory('TransactionHistoryService', ['HandlerAPI', '$rootScope', function(HandlerAPI, $rootScope) {
        var handlerName = "transactionHistory";
        return {
            getSentHistory: function(filter) {
               return HandlerAPI.promiseRequest(handlerName, 'getSentHistory', {params : filter, headers : $rootScope.tokenHeader() });
            },
            getReceivedHistory: function(filter) {
               return HandlerAPI.promiseRequest(handlerName, 'getReceivedHistory', {params : filter, headers : $rootScope.tokenHeader() });
            }
        }
}]);
;;