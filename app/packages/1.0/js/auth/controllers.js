module.controller('TestCtrl', ['$scope', '$rootScope', '$state', 'LoginServices', 'ProfileService', 'AllUsersService', '$localStorage', 'ReceiverConstants',
function($scope, $rootScope, $state, LoginServices, ProfileService, AllUsersService, $localStorage, ReceiverConstants) {
        var ctrl = this;
        $scope.isLoading = false;

        $scope.login = {
            credentials:{}
        };

        $scope.listOfUsers = [];

        $scope.submitLoginTest = function() {
            $scope.isLoading = true;

            LoginServices.login($scope.login.credentials).then( function(data) {
                if(data.data.token == "\"Unauthenticated\"") 
                {
                    $scope.isLoading = false;
                    console.log("failed getting token");
                    $state.go('login');     
                    $rootScope.alertTitle("Login Error","There was a problem logging in, please check your username and password!");             
                }
                else
                {
                     var userToken = data.data.token.replace(/"/g, '');
                     //var regExpression = /\r?\n|\r/g;            
                     //var checkTokenAuth = userToken.replace(regExpression,'');
                     // $scope.saveToken(userToken);
                      
                     console.log("userToken : "+userToken);
                     console.log("useremail : "+$scope.login.credentials.uname);
                     
                     ProfileService.getProfile($scope.login.credentials.uname, userToken).then( function(data){
                           
                           console.log("get profile from service:" +JSON.stringify(data));
                           console.log("get profile from service2:" +data);
                           if(data == "\"Unauthenticated\"") //if Unauthenticated and profile Not found wont continue 
                           {     
                               $scope.isLoading = false;
                               console.log("failed getting profile");
                               $state.go('login'); 
                           }
                           else if(data == "\"Not found\"")
                           {                    
                               $scope.isLoading = false;
                               console.log("failed getting profile");
                               $state.go('login');
                           }
                           else
                           {
                               console.log("get profile before save:" +data.name + "  "+ data.surname);
                               ctrl.onSuccessfullLogin(userToken, data);                                        
                           }
                       }, function(err) {
                           console.log("error getting profile");
                           console.log(err);
                           $scope.isLoading = false;
                       }); 
                }              
            }, function(err) {
                console.log("not login ");
                console.log(err);
                $scope.isLoading = false;
            });

        };

        ctrl.getAllUsers = function(){
            
            AllUsersService.performSearch().then(function (data){
                if(data == null)
                {
                    console.log("failed getting list of users");
                }
                else
                {
                    console.log("Type of listOfUsers : "+typeof listOfUsers)
                    console.log("Data type : "+typeof data);
                    console.log("Array of users"+data[1].name);

                    $rootScope.saveListOfUsers(data);
                }
            }, function(err) {
                console.log("error getting list of users");
                console.log(err);
                $scope.isLoading = false;
            });

        };

        ctrl.onSuccessfullLogin = function(userToken,userProfile) {
             if(userProfile == "Unauthenticated")
             {
                $rootScope.alertTitle("Login Error","There was a problem logging in, please check your username and password!");
             }
             else
             {
                console.log("before saving token: "+userProfile); 
                $rootScope.saveToken(userToken); 
                $rootScope.saveProfile(userProfile);
                ctrl.getAllUsers();
                $state.go('tab.newsFeeds');                
             }
        };

        

}]);;;

module.controller('ProfileCtrl', [
    '$log', '$q', '$rootScope', '$scope', '$state',
    function($log, $q, $rootScope, $scope, $state) {
        var ctrl = this;

        console.log("reached profile controller");
        $scope.userProfile = $rootScope.getProfile();

        console.log("prof :  -->"+JSON.stringify($scope.userProfile));             

        ctrl.init = function() {

        };

        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();
        //---------------------------------------
    }
]);;;
