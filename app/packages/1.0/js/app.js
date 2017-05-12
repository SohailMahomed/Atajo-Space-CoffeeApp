var module = angular.module('AtajoApp', [
    'atajoui',
    'ngStorage',
    'ngMessages'
]);

var getIIcon = angular.module('getIIcon', []).filter('getIIcon', function () {
    return function (input, IMAGES) {
        var output = '';
        if (input.indexOf('.pptx') > -1) {
            output = IMAGES['png_file-powerpoint-o'].imgData;
        } else if (input.indexOf('.docx') > -1) {
            output = IMAGES['png_file-word-o'].imgData;
        } else if (input.indexOf('.doc') > -1) {
            output = IMAGES['png_file-word-o'].imgData;
        } else if (input.indexOf('.pdf') > -1) {
            output = IMAGES['png_file-pdf-o'].imgData;
        } else if (input.indexOf('.aspx') > -1) {
            output = IMAGES['png_file-word-o'].imgData;
        } else if (input.indexOf('.xlsm') > -1) {
            output = IMAGES['png_file-excel-o'].imgData;
        } else if (input.indexOf('.xls') > -1) {
            output = IMAGES['png_file-excel-o'].imgData;
        } else if (input.indexOf('.zip') > -1) {
            output = IMAGES['png_file-zip-o'].imgData;
        } else if (input.indexOf('.7z') > -1) {
            output = IMAGES['png_file-zip-o'].imgData;
        } else if (input.indexOf('.gzip') > -1) {
            output = IMAGES['png_file-zip-o'].imgData;
        } else if (input.indexOf('.rar') > -1) {
            output = IMAGES['png_file-zip-o'].imgData;
        } else if (input.indexOf('.mp3') > -1) {
            output = IMAGES['png_file-audio-o'].imgData;
        } else if (input.indexOf('.mvid') > -1) {
            output = IMAGES['png_file-video-o'].imgData;
        } else if (input.indexOf('.mp4') > -1) {
            output = IMAGES['png_file-video-o'].imgData;
        } else if (input.indexOf('.svg') > -1) {
            output = IMAGES['png_file-image-o'].imgData;
        } else if (input.indexOf('.jpg') > -1) {
            output = IMAGES['png_file-image-o'].imgData;
        } else if (input.indexOf('.jpeg') > -1) {
            output = IMAGES['png_file-image-o'].imgData;
        } else if (input.indexOf('.png') > -1) {
            output = IMAGES['png_file-image-o'].imgData;
        } else if (input.indexOf('.bmp') > -1) {
            output = IMAGES['png_file-image-o'].imgData;
        } else if (input.indexOf('.js') > -1) {
            output = IMAGES['png_file-code-o'].imgData;
        } else {
            output = IMAGES['png_file-text-o'].imgData;
        }
        return output
    }
});

var getIcon = angular.module('getIcon', []).filter('getIcon', function () {
    return function (input) {
        var output = '';
        if (input.indexOf('.pptx') > -1) {
            output = 'file-powerpoint-o';
        } else if (input.indexOf('.docx') > -1) {
            output = 'file-word-o';
        } else if (input.indexOf('.doc') > -1) {
            output = 'file-word-o';
        } else if (input.indexOf('.pdf') > -1) {
            output = 'file-pdf-o';
        } else if (input.indexOf('.aspx') > -1) {
            output = 'file-word-o';
        } else if (input.indexOf('.xlsm') > -1) {
            output = 'file-excel-o';
        } else if (input.indexOf('.xls') > -1) {
            output = 'file-excel-o';
        } else if (input.indexOf('.zip') > -1) {
            output = 'file-zip-o';
        } else if (input.indexOf('.7z') > -1) {
            output = 'file-zip-o';
        } else if (input.indexOf('.gzip') > -1) {
            output = 'file-zip-o';
        } else if (input.indexOf('.rar') > -1) {
            output = 'file-zip-o';
        } else if (input.indexOf('.mp3') > -1) {
            output = 'file-audio-o';
        } else if (input.indexOf('.mvid') > -1) {
            output = 'file-video-o';
        } else if (input.indexOf('.mp4') > -1) {
            output = 'file-video-o';
        } else if (input.indexOf('.svg') > -1) {
            output = 'file-image-o';
        } else if (input.indexOf('.jpg') > -1) {
            output = 'file-image-o';
        } else if (input.indexOf('.jpeg') > -1) {
            output = 'file-image-o';
        } else if (input.indexOf('.png') > -1) {
            output = 'file-image-o';
        } else if (input.indexOf('.bmp') > -1) {
            output = 'file-image-o';
        } else if (input.indexOf('.js') > -1) {
            output = 'file-code-o';
        } else {
            output = 'file-text-o';
        }

        return output;


    };
});

var toTrusted = angular.module('toTrusted', []).filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);


var trim = angular.module('trim', []).filter('trim', function () {
    return function (value) {
        if (!angular.isString(value)) {
            return value;
        }
        return value.replace(/^\s+|\s+$/g, ''); // you could use .trim, but it's not going to work in IE<9
    }
});;;

module.config(['$atajoUiConfigProvider', function($atajoUiConfigProvider) {
    // Remove back button text completely
    $atajoUiConfigProvider.backButton.previousTitleText(false).text('');
}]);

var checkedImages = false;

module.run(function($atajoUiPlatform, $rootScope) {
    $atajoUiPlatform.ready(function() {
        atajo.log.d("ATAJO-UI INIT: platform " + atajoui.Platform.platform());

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        if (window.StatusBar) { // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
            if (atajoui.Platform.isAndroid()) {
                StatusBar.backgroundColorByHexString("#455A64");
            } /*else if (atajoui.Platform.isIOS()) {
                StatusBar.overlaysWebView(true);
            }*/
        }
        //LOAD IMAGES
        
        $rootScope.IMAGES = false;
        $rootScope.hasIMAGES = false;

        var today = new Date();
        
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
        var today = dd+'/'+mm+'/'+yyyy;

        $rootScope.parseDate = function(str) {
            var mdy = str.split('/');
            return new Date(mdy[2], mdy[0]-1, mdy[1]);
        }

        $rootScope.daydiff = function (first, second) {
            return Math.round((second-first)/(1000*60*60*24));
        }
        
        $rootScope.imgSyncCheck = function(){

            var syncCheck = {
                date_of_request:today,
                status:'checked'
            }

            atajo.database.getAll('syncCheck', function (data) {

                
                if(data.length==0){

                    atajo.database.nuke('syncCheck');
                    atajo.database.nuke('imageDB');
                    $rootScope.IMAGES = false;
                    $rootScope.getImages().then(
                        function(){
                                atajo.database.set('syncCheck', syncCheck)
                            }
                    );
                    

                }else{
                    var lastchecked = data[0].date_of_request;
                    
                    var difference = $rootScope.daydiff($rootScope.parseDate(lastchecked),$rootScope.parseDate(today));
                    if(difference>=7){
                        atajo.database.nuke('syncCheck');
                        atajo.database.nuke('imageDB');
                        $rootScope.IMAGES = false;
                        $rootScope.getImages().then(
                        function(){
                                atajo.database.set('syncCheck', syncCheck)
                            }
                        );
                    }
                }
                
            });
            
            


        }
        
        $rootScope.getImages = function () {
            return new Promise (
                function(resolve,reject){
                    if (!$rootScope.IMAGES) {
                                    var data = {};
                                    
                                    atajo.api.get('imageHandler', data, function (response) {
                                        if(response.message=="PROVIDER NOT CONNECTED" ||response.message=="DEVICE OFFLINE"){
                                            $rootScope.getImages();  
                                        }else{
                                            atajo.database.nuke('imageDB');
                                            atajo.database.set('imageDB', response);
                                            $rootScope.IMAGES = response;
                                            $rootScope.hasIMAGES = true;
                                            checkedImages = true;
                                            $rootScope.$apply();
                                            resolve(response);
                                        }
                                        
                                });
                    }
            });
        }
        $rootScope.imgSyncCheck();
        $rootScope.checkImages = function (cb) {


            atajo.database.getAll('imageDB', function (data) {

                if (data.length > 1) {
                    $rootScope.IMAGES = data[0];
                    $rootScope.hasIMAGES = true;
                    atajo.database.nuke('imageDB');
                    atajo.database.set('imageDB', $rootScope.IMAGES);

                    cb(true)
                } else if (data.length > 0) {

                    switch (data[0].message) {
                        case 'PROVIDER NOT CONNECTED':
                            atajo.database.nuke('imageDB');
                            $rootScope.IMAGES = false;
                            $rootScope.hasIMAGES = false;
                            cb(false);
                            break;
                        case 'DEVICE OFFLINE':
                            atajo.database.nuke('imageDB');
                            $rootScope.IMAGES = false;
                            $rootScope.hasIMAGES = false;
                            cb(false);
                            break;
                        default:
                            $rootScope.IMAGES = data[0];
                            $rootScope.hasIMAGES = true;
                            cb(true);
                            break;
                    }

                } else {

                    $rootScope.IMAGES = false;
                    $rootScope.hasIMAGES = false;
                    cb(false)
                }
            });

        }

        $rootScope.checkImages(function (result) {

                if (!result) {
                    $rootScope.getImages();
                }else{
                    checkedImages = true;
                }
        });
        
        $rootScope.getImageClass = function (elementType) {
            if(checkedImages){
                switch (elementType) {
                    case "background-image":
                        if ($rootScope.hasIMAGES) {
                            return "";
                        } else {
                            return "login-back";
                        }
                    case "ServiceAvailabilityMap":
                        if ($rootScope.hasIMAGES) {
                            return "";
                        } else {
                            return "ServiceAvailabilityMap";
                        }
                    case "ServiceAvailabilityMapNumber":
                        {
                            if ($rootScope.hasIMAGES) {
                                return "";
                            } else {
                                return "ServiceAvailabilityMapNumber";
                            }
                        }
                    default:
                        return "";
                }
            }else{
                return "";
            }

        }
/*
        $rootScope.getImageStyle = function () {
            if ($rootScope.hasIMAGES){
                return {'background-image': 'url(data:image/png;base64,'+$rootScope.IMAGES.img_cycle_back.imgData+')'};         
            }
        }
*/
    });
});

module.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  
  
    $urlRouterProvider.otherwise("/login");

  $stateProvider
        .state('login', {
            url: '/login',
            controller: 'TestCtrl',
            templateUrl: 'login.html'
        }).state('tab', {
            url: '/tab',
            controller: 'TabsCtrl',
            abstract: true,
            templateUrl: atajoui.Platform.isIOS() ? 'tabs-ios.html' : 'tabs.html'
        })/*.state('slideMenu', {
            url: '/tab',
            controller: 'TestMenuCtrl',
            templateUrl: 'slideMenu.html'
        })*/.state('tab.newsFeeds',{
            url: '/newsFeeds',
            views: {
                'tab-newsFeeds':{
                    templateUrl: 'tab-newsFeeds.html',
                    controller: 'NewsFeedCtrl'
                }
            }
        })/*.state('tab.home',{
            url: '/home',
            views: {
                'tab-home':{
                    templateUrl: 'tab-home.html',
                    controller: 'TestHomeCtrl'
                }
            }
        }).state('tab.inbox', {
            url: '/inbox',
            views: {
                'tab-home': {
                    templateUrl: 'inboxDetails.html',
                    controller: 'TestHomeCtrl'
                }
            }
        }).state('tab.sent', {
            url: '/sent',
            views: {
                'tab-home': {
                    templateUrl: 'sentDetails.html',
                    controller: 'TestHomeCtrl'
                }
            }
        }).state('tab.transfer', {
            url: '/transfer',
            views: {
                'tab-home': {
                    templateUrl: 'transferDetails.html',
                    controller: 'TestTransferCtrl'
                }
            }
        })*/.state('tab.newFistBump',{
            url: '/newFistBump',
            views: {
                'tab-newFistBump':{
                    templateUrl: 'tab-newFistBump.html',
                    controller: 'NewFistBumpCtrl'
                }
            }
        }).state('tab.newTransfer',{
            url: '/newTransfer',
            views: {
                'tab-newTransfer':{
                    templateUrl: 'tab-newTransfer.html',
                    controller: 'TransferCtrl'
                }
            }
        }).state('tab.more',{
            url: '/more',
            views: {
                'tab-more':{
                    templateUrl: 'tab-more.html',
                    controller: 'MoreCtrl'
                }
            }
        }).state('tab.transferHistory', {
            url: '/transferHistory',
            views: {
                'tab-transferHistory': {
                    templateUrl: 'transferHistoryMenu.html',
                    controller: 'TransferHistoryCtrl'
                }
            }
        }).state('tab.ourMenu', {
            url: '/ourMenu',
            views: {
                'tab-more': {
                    templateUrl: 'ourMenu.html',
                    controller: 'OurMenuCtrl'
                }
            }
        }).state('profile', {
            url: '/profile',
            controller: 'ProfileCtrl',
            templateUrl: 'userProfileDetails.html'
        }).state('payment', {
            url: '/payment',
            controller: 'PaymentCtrl',
            templateUrl: 'payment.html'
        })
        /*.state('tab.profile', {
            url: '/profile',
            views: {
                'tab-more': {
                    templateUrl: 'userProfileDetails.html',
                    controller: 'ProfileCtrl'
                }
            }
        }).state('tab.payment', {
            url: '/payment',
            views: {
                'tab-more': {
                    templateUrl: 'payment.html',
                    controller: 'PaymentCtrl'
                }
            }
        })*/;
        
    
}]);


;;