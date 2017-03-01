module.factory('TransferService', ['HandlerAPI', '$rootScope', function(HandlerAPI, $rootScope) {
        var handlerName = "transfer";
        return {
            performTransfer: function(receiver, transferData) {
               return HandlerAPI.promiseRequest(handlerName, 'performTransfer', {params : receiver, data: transferData, headers : $rootScope.tokenHeader() });
            },
            getBeanBalance: function(username) {
               return HandlerAPI.promiseRequest(handlerName, 'getBeanBalance', {params : username, headers : $rootScope.tokenHeader() });
            },
            performPayment: function(receiver, transferData) {
               return HandlerAPI.promiseRequest(handlerName, 'performPayment', {params : receiver, data: transferData, headers : $rootScope.tokenHeader() });
            }
        }

}]);
;;

module.factory('SearchService', ['HandlerAPI', '$rootScope', function(HandlerAPI, $rootScope) {
        var handlerName = "search";
        return {
            performSearch: function(search) {
               return HandlerAPI.promiseRequest(handlerName, 'performSearch', {params : search, headers : $rootScope.tokenHeader() });
            }
        }

}]);
;;

;;