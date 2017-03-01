var module = angular.module('AtajoApp', [
    'atajoui',
    'ngStorage',
    'ngMessages'
]);

module.config(['$atajoUiConfigProvider', function($atajoUiConfigProvider) {
    // Remove back button text completely
    $atajoUiConfigProvider.backButton.previousTitleText(false).text('');
}]);

module.run(['$atajoUiPlatform', function($atajoUiPlatform) {
    $atajoUiPlatform.ready(function() {
        atajo.log.d("ATAJO-UI INIT: platform " + atajoui.Platform.platform());

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        if (window.StatusBar) { // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
            if (atajoui.Platform.isAndroid()) {
                StatusBar.backgroundColorByHexString("#455A64");
            } else if (atajoui.Platform.isIOS()) {
                StatusBar.overlaysWebView(true);
            }
        }
    });
}]);

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
        })/*.state('tab.baristaMenu', {
            url: '/baristaMenu',
            views: {
                'tab-more': {
                    templateUrl: 'baristaMenuDetails.html',
                    controller: 'TestMoreCtrl'
                }
            }
        }).state('tab.blacksmith', {
            url: '/blacksmith',
            views: {
                'tab-more': {
                    templateUrl: 'blacksmithDetails.html',
                    controller: 'TestMoreCtrl'
                }
            }
        }).state('tab.baristaProgramme', {
            url: '/baristaProgramme',
            views: {
                'tab-more': {
                    templateUrl: 'baristaProgrammeDetails.html',
                    controller: 'TestMoreCtrl'
                }
            }
        }).state('tab.baristaProfile', {
            url: '/baristaProfile',
            views: {
                'tab-more': {
                    templateUrl: 'baristaProfileDetails.html',
                    controller: 'TestMoreCtrl'
                }
            }
        })*/.state('tab.transferHistory', {
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
        })/*.state('profile', {
            url: '/profile',
            controller: 'ProfileCtrl',
            templateUrl: 'userProfileDetails.html'
        }).state('payment', {
            url: '/payment',
            controller: 'PaymentCtrl',
            templateUrl: 'payment.html'
        })*/
        .state('tab.profile', {
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
        });
        
    
}]);


;;