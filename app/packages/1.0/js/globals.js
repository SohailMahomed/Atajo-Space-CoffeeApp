module.run(['$rootScope', '$localStorage', '$log', '$q',
    function($rootScope, $localStorage, $log, $q) {

        //on login
        $rootScope.authBasic = function(creds) {
            return { "Authorization ": "Basic "+ creds};
        };

        $rootScope.saveProfile = function(profile) {
            $localStorage.profile = profile;
            //console.log("Profile saved : "+JSON.stringify(profile));           
        };

        $rootScope.saveListOfUsers = function(listOfUsers) {
            $localStorage.listOfUsers = listOfUsers;
        };

        $rootScope.saveToken = function(token) {
            $localStorage.token = token;
            $localStorage.isLoggedIn = true;
            console.log("Token saved local storage : "+$localStorage.token);
        };

        $rootScope.getList = function() {
            return $localStorage.listOfUsers;
        };

        $rootScope.tokenHeader = function() {
            return $localStorage.token;
        };

        $rootScope.saveMenuList = function(menuList) {
            $localStorage.menuList = menuList;
        };

        $rootScope.getMenuList = function() {
            return $localStorage.menuList;
        };

        $rootScope.saveListToPay = function(listToPay) {
            delete $localStorage.listToPay;
            $localStorage.listToPay = listToPay;
            console.log("List to Pay global:"+listToPay[0].name);
        };

        $rootScope.getListToPay = function() {
            if($localStorage.listToPay)
            {
                return $localStorage.listToPay;
            }
            else
            {
                return "";
            }
        };

        $rootScope.weekConfig = function() {
            var weekNo = moment().format('W');
            //delete $localStorage.currentWeek;
            $localStorage.lastWeek = weekNo;
            
            if(!$localStorage.currentWeek)
            {
                $localStorage.currentWeek = weekNo;
                $localStorage.fistbumpCount = 4;
                console.log("We are here 1");
            }
            else if($localStorage.currentWeek != $localStorage.lastWeek)
            {
                $localStorage.currentWeek = weekNo;
                $localStorage.fistbumpCount = 4;
                console.log("We are here 2");
            }
            else if($localStorage.currentWeek == $localStorage.lastWeek)
            {
                $localStorage.currentWeek = $localStorage.lastWeek;
                console.log("We are here 3");
            }
            console.log("We are in week : "+$localStorage.currentWeek);
            return $localStorage.currentWeek;
        };

        $rootScope.currentFistbumps = function() {
            return $localStorage.fistbumpCount;
        };

        $rootScope.decreaseLimit = function() {
            $localStorage.fistbumpCount = $localStorage.fistbumpCount - 1;
        };

        $rootScope.isLoggedIn = function() {
            return $localStorage.isLoggedIn && $localStorage.profile; //extra redundant checks to help with update
        };

        //on logout
        $rootScope.clearProfile = function() {
            delete $localStorage.profile;
            delete $localStorage.token;
            console.log("Profile and Token deleted");
            $localStorage.isLoggedIn = false;
        };

        $rootScope.getUserFullName = function() {
            if ($localStorage.profile) {
                return $localStorage.profile.firstName + " " + ($localStorage.profile.lastName ? $localStorage.profile.lastName : '');
            } else {
                return "";
            }
        };

        $rootScope.getProfile = function() {
            return $localStorage.profile;
        };

        $rootScope.getProfileId = function() {
            if ($localStorage.profile) {
                return $localStorage.profile._id;
            } else {
                return "";
            }
        };

        $rootScope.getUsername = function() {
            if ($localStorage.profile) {
                return $localStorage.profile.email;
            } else {
                return "";
            }
        };


        $rootScope.getRole = function() {
            if ($localStorage.profile) {
                return $localStorage.profile.role;
            } else {
                return "user";
            }
        };

        //--------------------------------------------------------+
        //                     START-UP LOADS                     |
        //--------------------------------------------------------+


    }
]);

//helpers
module.run(['$rootScope', '$atajoUiPopup', '$atajoUiModal', '$sce', function($rootScope, $atajoUiPopup, $atajoUiModal, $sce) {

    //zooming constants
    $rootScope.maxImageZoom = 5;
    $rootScope.minImageZoom = 1;

    $rootScope.getPdfViewUrl = function(url) {
        return $sce.trustAsResourceUrl("https://docs.google.com/gview?embedded=true&url=" + url);
    };

    $rootScope.alertTitleMessage = function(titleText, message) {
        var alertPopup = $atajoUiPopup.alert({
            title: titleText,
            template: message,
            okType: 'button-royal'
        });
        alertPopup.then(function(res) {
            //do nothing
        });
    };


    $rootScope.alertTitle = function(titleText) {
        var alertPopup = $atajoUiPopup.alert({
            title: titleText,
            okType: 'button-royal'
        });
        alertPopup.then(function(res) {
            //do nothing
        });
    };

    $rootScope.confirmPopup = function(titleText, message, opts) {
        var opts = opts || {}; //optional extra params

        opts.title = titleText;
        opts.template = message;
        opts.okType = opts.okType || 'button-royal';
        opts.cancelType = opts.cancelType || 'button-royal';
             
        return $atajoUiPopup.confirm(opts);
    };

    $rootScope.customPopup = function(titleText, message, template, opts) {
        var opts = opts || {}; //optional extra params

        opts.title = titleText;
        opts.subTitle = message;
        opts.template = template;

        return $atajoUiPopup.show(opts);
    };

    $rootScope.createModal = function(templateUrl, scope) {
        return $atajoUiModal.fromTemplateUrl(templateUrl, {
            scope: scope,
            animation: 'slide-in-up'
        });
    };

    $rootScope.getAddIcon = function() {
        if (atajoui.Platform.isAndroid())
            return 'ion-android-add';
        else if (atajoui.Platform.isIOS())
            return 'ion-ios-plus-empty';
        else
            return 'ion-plus';
    };

    $rootScope.getCheckIcon = function() {
        if (atajoui.Platform.isAndroid())
            return 'ion-android-done';
        else if (atajoui.Platform.isIOS())
            return 'ion-ios-checkmark-empty';
        else
            return 'ion-checkmark';
    };

    $rootScope.getCancelIcon = function() {
        if (atajoui.Platform.isAndroid())
            return 'ion-android-close';
        else if (atajoui.Platform.isIOS())
            return 'ion-ios-close-empty';
        else
            return 'ion-close';
    };

    $rootScope.getPersonIcon = function() {
        if (atajoui.Platform.isAndroid())
            return 'ion-android-person';
        else if (atajoui.Platform.isIOS())
            return 'ion-ios-person';
        else
            return 'ion-person';
    };

    $rootScope.getEditIcon = function() {
        if (atajoui.Platform.isAndroid())
            return 'ion-android-create';
        else if (atajoui.Platform.isIOS())
            return 'ion-ios-compose-outline';
        else
            return 'ion-edit';
    };

    $rootScope.getSubmitIcon = function() {
        if (atajoui.Platform.isAndroid())
            return 'ion-android-send';
        else if (atajoui.Platform.isIOS())
            return 'ion-ios-paperplane-outline';
        else
            return 'ion-android-send';
    };

}]);

;;