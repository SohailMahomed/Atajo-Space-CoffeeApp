module.factory('LoginServices', ['HandlerAPI', function(HandlerAPI) {
    //My Basic Auth cred { headers: "Authorization: Basic c29oYWlsLm1haG9tZWRAYnJpdGVob3VzZS5jby56YTpzb2hhaWwubWFob21lZEBicml0ZWhvdXNlLmNvLnph"}
        return {
        login: function(credentials) {
           // var stringToEncode = credentials.username+":"+credentials.password;
           // var encodedString = btoa(stringToEncode);
           // var headerEncoded = $rootScope.authBasic(encodedString);
        //   creds.headers = "Authorization: Basic c29oYWlsLm1haG9tZWRAYnJpdGVob3VzZS5jby56YTpzb2hhaWwubWFob21lZEBicml0ZWhvdXNlLmNvLnph";
        console.log('Creds :    '+credentials.uname);
           return HandlerAPI.promiseAuth(credentials);
        }
    }
}]);
;;

module.factory('ProfileService', ['HandlerAPI', '$rootScope', function(HandlerAPI, $rootScope) {
        var handlerName = "profile";
        return {
            getProfile: function(userEmail, userToken) {
               return HandlerAPI.promiseRequest(handlerName, 'getProfile', {params : userEmail, headers : userToken });
            }
        }

}]);
;;

module.factory('AllUsersService', ['HandlerAPI', '$rootScope', function(HandlerAPI, $rootScope) {
        var handlerName = "Users";
        return {
            performSearch: function() {
               return HandlerAPI.promiseRequest(handlerName, 'getUsers', { headers : $rootScope.tokenHeader() });
            }
        }

}]);
;;