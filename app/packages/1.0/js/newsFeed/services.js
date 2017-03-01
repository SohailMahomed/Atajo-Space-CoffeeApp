module.factory('NewsfeedService', ['HandlerAPI', '$rootScope', function(HandlerAPI, $rootScope) {
        var handlerName = "newsFeed";
        return {
            getNewsfeed: function(filter) {
               return HandlerAPI.promiseRequest(handlerName, 'getNewsfeed', {params : filter, headers : $rootScope.tokenHeader() });
            }
        }

}]);
;;