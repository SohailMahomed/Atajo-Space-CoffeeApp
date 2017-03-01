module.factory('ReceiverService', ['HandlerAPI', '$rootScope', function(HandlerAPI, $rootScope) {
        var handlerName = "receiver";
        return {
            getReceiver: function(receiverPattern) {
               return HandlerAPI.promiseRequest(handlerName, 'getReceiver', {params : receiverPattern, headers : $rootScope.tokenHeader() });
            }
        }

}]);
;;

module.factory('SendFistBumpService', ['HandlerAPI', '$rootScope', function(HandlerAPI, $rootScope) {
        var handlerName = "fistBump";
        return {
            performFistbump: function(receiver, fistBumpData) {
               return HandlerAPI.promiseRequest(handlerName, 'performFistbump', {params : receiver, data: fistBumpData, headers : $rootScope.tokenHeader() });
            }
        }

}]);
;;