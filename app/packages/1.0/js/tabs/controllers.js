module.controller('TabsCtrl', ['$log', '$q', '$rootScope', '$scope', '$state',
function($log, $q, $rootScope, $scope, $state) {
    var ctrl = this;
    
    $scope.logout = function() {
            $rootScope.clearProfile();
            $scope.isLoading = false; 
            $state.go('login');
            console.log('Logged out');
        };
/*
    $scope.profile = function() 
    { 
        $state.go('profile');
    };    

    $scope.payment = function() 
    { 
        $state.go('payment');
    };    
*/
        ctrl.init = function() {

        };    

        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();

}]);;;