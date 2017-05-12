module.controller('TestHomeCtrl', [
    '$log', '$q', '$rootScope', '$scope', '$state',
    function($log, $q, $rootScope, $scope, $state) {
        var ctrl = this;
        $scope.isLoading = false;
 //       $scope.profile = $rootScope.getProfile();

        ctrl.init = function() {

        };

        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();
        //---------------------------------------
    }
]);

module.controller('NewFistBumpCtrl', [
    '$log', '$q', '$rootScope', '$scope', '$state', 'ReceiverService', 'SendFistBumpService',
    function($log, $q, $rootScope, $scope, $state, ReceiverService, SendFistBumpService) {
        var ctrl = this;
        $scope.isLoading = false;

        $scope.user = $rootScope.getProfile();

        $rootScope.weekConfig();

        var userSender = "";
        if($scope.user.username !== "")
        {
            userSender = $scope.user.username;
        }

        $scope.testSearch = {};

        $scope.list = $rootScope.getList();
        
        console.log("list from fistbump"+JSON.stringify($scope.list));

        $scope.SelectedUsers = null;
        
        $scope.fistBump = {
            Sender : userSender,
            FistBumps : 5.0,
        };

        $scope.fistbumpParams = {
            fbParams:{}
        };

        $scope.fistBumpLimit = $rootScope.currentFistbumps();

        $scope.searchUser = "";

        $scope.categories = 
        [
            'Captain Curiosity', 
            'Good-to-Greater', 
            'Laser-like Quality', 
            'Solutions Oriented', 
            'Super Positive', 
            'Team Player', 
            'Uninterrupted Power Supply'
        ];

        $scope.verifyReceiver = function()
        {
             ReceiverService.getReceiver($scope.fistbumpParams.fbParams.Receiver).then( function(data){
                if(data.toString() == "Not found")
                {
                    console.log("failed getting profile");
                    return data;
                }
                else
                {
                    var dataContainer = data;
                    console.log("getProfile Rest pattern user: "+data); 
                    return "1 2 3 test";
                }

            }, function(err) {
                console.log("error getting profile");
                console.log(err);
            });

        };

        $scope.showSummaryFistBumpDialog = function() {
            var template =
                '<aui-list><aui-item>' +
                '<h4>Summary</h4>' +
                '<p style="white-space: pre-wrap;">{{fistBump.Sender}} is about to fist bump {{fistbumpParams.fbParams.Receiver}} with {{fistBump.FistBumps}} beans</p>' +
                '</aui-item>' +
                '</aui-list>';
            $rootScope.confirmPopup("Summary Fistbump", template, {
                scope: $scope
            }).then(function(res) {
                console.log("Fistbump details : "+$scope.fistBump.Sender+" fisted bumped "+$scope.fistBump.FistBumps+" beans to "+$scope.fistbumpParams.fbParams.Receiver+" for the cat "+$scope.fistbumpParams.fbParams.Category+" and msg "+$scope.fistbumpParams.fbParams.Message);
                
               if(res) {
                    
                   $scope.errorMessage = "";
                   var isValid = false;

                   if($scope.fistbumpParams.fbParams.Receiver == $scope.fistBump.Sender)
                   {
                       isValid = false;
                   }
                   else
                   {
                       isValid = true;
                   }


                   if(isValid) 
                   {
                        if($rootScope.currentFistbumps() > 0)
                        {
                            if($scope.fistbumpParams.fbParams.Category != null)
                            {
                                ctrl.submitFistbump();  
                                console.log("ready to do fistBump");
                            }
                            else
                            {
                               $scope.errorMessage += "Please select a Category";
                            }

                        }
                        else{
                            $scope.errorMessage += "Error performing fistbump, you have used up your fistbump limit. ";
                            ctrl.load;
                        }   
                   }
                   else
                   {
                       $scope.errorMessage += "Please ensure that you have selected/entered a valid user. ";
                   } 
                   return $scope.errorMessage;
                }
                else {
                    //do nothing
                }
            });
        };

        ctrl.submitFistbump = function() {
            var fistBumpData = {
                topic: $scope.fistbumpParams.fbParams.Category,
                message: $scope.fistbumpParams.fbParams.Message ? $scope.fistbumpParams.fbParams.Message : " ",
                credits: $scope.fistBump.FistBumps,
                requestedBy: $scope.fistBump.Sender 
            };

            SendFistBumpService.performFistbump($scope.fistbumpParams.fbParams.Receiver, fistBumpData).then(function(data){
               // $rootScope.alertTitleMessage("Message ", JSON.stringify(data));
                //$rootScope.weekConfig();
                //console.log("Current fistbump limit is "+$scope.currentFistbumps);
               // $rootScope.decreaseLimit();
               // var newFistbumps = $rootScope.currentFistbumps();
               // console.log("New fistbump limit is "+newFistbumps);

               if(data[0].result == true)
               {
                    console.log("Current fistbump limit is "+$rootScope.currentFistbumps());
                    $rootScope.decreaseLimit();
                    var newFistbumps = $rootScope.currentFistbumps();
                    console.log("New fistbump limit is "+newFistbumps);

                    ctrl.load();
                    $state.go('tab.newsFeeds');
               }
               else if(data[0].result == false)
               {

               }
               else
               {

               }

            }, function(err){
                $rootScope.alertTitleMessage("Fistbump Error", err.message);
            });
            
        };

        //index for list
        $scope.selectedIndex = -1;
        //define empty list to populate with users
        $scope.userList = [];

        //search function : search variable passed as lowercase
        //                  loop through list of users and store the first 5 users in a list that matchs the criteria                     
        $scope.searchFunc = function() {
            $scope.userList = [];
            var myMaxUserListLength = 0;
            for(var i=0; i < $scope.list.length; i++)
            {
                var searchUsersSmallLetters = $scope.list[i].username;
                var searchTextSmallLetters = $scope.fistbumpParams.fbParams.Receiver;
                if( searchUsersSmallLetters.indexOf(searchTextSmallLetters.toLowerCase()) !== -1)
                {
                    $scope.userList.push(searchUsersSmallLetters);
                    myMaxUserListLength += 1;
                    if(myMaxUserListLength == 5)
                    {
                        break;
                    }
                  //  console.log("List of users : "+$scope.userList);               
                }
            }
        };

        $scope.$watch('selectedIndex',function(val){
            if(val !== -1)
            {
                $scope.fistbumpParams.fbParams.Receiver = $scope.list[$scope.selectedIndex];
            }
        });

        //
        $scope.checkKeyDown = function(event) {
            if(event.keyCode === 13)
            {
                event.preventDefault();
                $scope.userList = [];
            }
        };
        
        //
        $scope.checkKeyUp = function(event) {
            if(event.keyCode !== 8 || event.keyCode !== 46)
            {
                if($scope.fistbumpParams.fbParams.Receiver == "")
                {
                    $scope.userList = [];
                }
            }
        };

        $scope.AssignValueAndHide = function(index) {
            $scope.fistbumpParams.fbParams.Receiver = $scope.userList[index];
            $scope.userList = [];

            
        };

        ctrl.init = function() {
            /*Date.prototype.getWeek = function() {
                var oneJan = new Date (this.getFullYear(),0,1);
                var millisecsInDay = 86400000;
                return Math.ceil((((this - oneJan) /millisecsInDay) + oneJan.getDay()+1)/7);
            }

            //note months in javascript dates count from 0 and not 1 eg. Jan will be 0 not 1
            var todayDate = new Date(2016,11,11);
            var weekno = todayDate.getWeek();
            console.log("Date is : "+todayDate); 
            console.log("Week for today is :"+weekno);//returns week as 51 should be 49 */
            $rootScope.weekConfig();
            console.log("Current fistbump limit is "+$rootScope.currentFistbumps());
        };

        ctrl.load = function() {
            $scope.fistbumpParams.fbParams.Receiver = "";
            $scope.fistbumpParams.fbParams.Message = null;
            $scope.fistbumpParams.fbParams.Category = null;
            $scope.fistBumpLimit = $rootScope.currentFistbumps();
        }

        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();
        //---------------------------------------
    }
]);;;

module.controller('TransferCtrl', [
    '$log', '$q', '$rootScope', '$scope', '$state', 'ReceiverService', 'TransferService', 'SearchService',
    function($log, $q, $rootScope, $scope, $state, ReceiverService, TransferService, SearchService) {
        var ctrl = this;
        $scope.isLoading = false;

        $scope.user = $rootScope.getProfile();

        var userSender = "";
        if($scope.user.username != "")
        {
            userSender = $scope.user.username;
        }

        $scope.testSearch = {};

        $scope.list = $rootScope.getList();
        
        $scope.SelectedUsers = null;
        
        $scope.transfer = {
            Sender : userSender
        };

        $scope.transferParams = {
            tParams:{}
        };

        $scope.searchUser = "";

        $scope.beanBalance = 0;

        $scope.errorMessage = "";

        $scope.showSummaryTransferDialog = function() {
            var template =
                '<aui-list><aui-item>' +
                '<h4>Summary</h4>' +
                '<p style="white-space: pre-wrap;">{{transfer.Sender}} is about to transfer {{transferParams.tParams.Receiver}} with {{transferParams.tParams.Credits}} beans</p>' +
                '</aui-item>' +
                '</aui-list>';
            $rootScope.confirmPopup("Summary Transfer", template, {
                scope: $scope
            }).then(function(res) {
                console.log("Transfer details : "+$scope.transfer.Sender+" transfered "+$scope.transferParams.tParams.Credits+" beans to "+$scope.transferParams.tParams.Receiver);      
                if(res) {
                    
                   $scope.errorMessage = "";
                   var isValid = false;

                   if($scope.transferParams.tParams.Receiver == $scope.transfer.Sender)
                   {
                       isValid = false;
                   }
                   else
                   {
                       isValid = true;
                   }


                   if(isValid) 
                   {
                        if($scope.transferParams.tParams.Credits != null)
                        {
                            
                            if($scope.transferParams.tParams.Credits <= $scope.beanBalance)
                            {
                                ctrl.submitTransfer();  
                                console.log("ready to do transfer");
                            }
                            else{
                               $scope.errorMessage += "Cannot perform transfer that exceeds your bean balance. ";
                            }

                        }
                        else{
                            $scope.errorMessage += "Please enter a valid number. ";
                        }   
                   }
                   else
                   {
                       $scope.errorMessage += "Please ensure that you have selected/entered a valid user. ";
                   } 

                    return $scope.errorMessage;

                }
                else {
                    //do nothing
                }                
            });
        };

        ctrl.submitTransfer = function() {
            var parseCredits = 0;
            parseCredits = parseInt($scope.transferParams.tParams.Credits);
            
            var transferData = {
                topic: " ",
                message: $scope.transferParams.tParams.Message ? $scope.transferParams.tParams.Message : " ",
                //credits: $scope.transferParams.tParams.Credits
                credits: parseCredits
            };
            
            var sender = $scope.transfer.Sender;
            var params = sender +"/"+$scope.transferParams.tParams.Receiver;
/*
            AccountService.getAccount($scope.transferParams.tParams.Receiver).then(function(data){
                if(data == "\"Not found\"")
                {
                   console.log("need to add account for user"); 
                }
            });*/

            TransferService.performTransfer(params, transferData).then(function(data){
                console.log("data.result : "+JSON.stringify(data));
                console.log("data.response : "+data[0].response);
                console.log("data.result : "+data[0].result);
                var x = ""; 
                x = data.result;
                console.log("data: "+x);
                if(data[0].result == true)
                {
                    console.log("success transfer");
                    ctrl.load();
                }
                else if(data[0].result == false)
                {
                    console.log("success");
                    ctrl.load();
                }
                else
                {
                    $rootScope.alertTitleMessage("Message ", JSON.stringify(data));
                }
                
                //$rootScope.alertTitleMessage("Message ", JSON.stringify(data));
            }, function(err){
                $rootScope.alertTitleMessage("Transfer Error", err.message);
            });

        };

        /*
        search via button -> /v1/search/{criteria}
        $scope.showSummarySearchDialog = function() {
            var template =
                '<aui-list><aui-item>' +
                '<h4>Summary</h4>' +
                '<p style="white-space: pre-wrap;">about to search for {{testSearch.user}}</p>' +
                '</aui-item>' +
                '</aui-list>';
            $rootScope.customPopup("Summary", "", template, {
                scope: $scope,
                buttons: [
                    { text: 'OK', type: 'button-calm' }
                ]
            }).then(function(res) {
                console.log("what is search value "+$scope.testSearch.user);
                ctrl.searchFriend();
                console.log("pass this point");
                
                //do nothing
            });

        };
        
        ctrl.searchFriend = function() {
            var search = $scope.testSearch.user;
            SearchService.performSearch(search).then(function(data){
                $rootScope.alertTitleMessage("Search ", JSON.stringify(data));
            },function(err){
                $rootScope.alertTitleMessage("Search Error", err.message);
            });
        };*/

        //index for list
        $scope.selectedIndex = -1;
        $scope.userList = [];

        $scope.searchFunc = function() {
            $scope.userList = [];
            var myMaxUserListLength = 0;
            for(var i=0; i < $scope.list.length; i++)
            {
                var searchUsersSmallLetters = $scope.list[i].username;
                var searchTextSmallLetters = $scope.transferParams.tParams.Receiver;
                if( searchUsersSmallLetters.indexOf(searchTextSmallLetters.toLowerCase()) !== -1)
                {
                    $scope.userList.push(searchUsersSmallLetters);
                    myMaxUserListLength += 1;
                    if(myMaxUserListLength == 5)
                    {
                        break;
                    }
                  //  console.log("List of users : "+$scope.userList);               
                }
            }
        };

        $scope.$watch('selectedIndex',function(val){
            if(val !== -1)
            {
                $scope.transferParams.tParams.Receiver = $scope.list[$scope.selectedIndex];
            }
        });

        $scope.checkKeyDown = function(event) {
            if(event.keyCode === 13)
            {
                event.preventDefault();
                $scope.userList = [];
            }
        };

        $scope.checkKeyUp = function(event) {
            if(event.keyCode !== 8 || event.keyCode !== 46)
            {
                if($scope.transferParams.tParams.Receiver == "")
                {
                    $scope.userList = [];
                }
            }
        };

        $scope.AssignValueAndHide = function(index) {
            $scope.transferParams.tParams.Receiver = $scope.userList[index];
            $scope.userList = [];
        };

        ctrl.init = function() {

            TransferService.getBeanBalance($scope.transfer.Sender).then(function(data){
                //$rootScope.alertTitleMessage("Message Balance", JSON.stringify(data));
                $scope.beanBalance = data;
                console.log("Bean Balance : "+$scope.beanBalance);
                return $scope.beanBalance;
            }, function(err){
                $rootScope.alertTitleMessage("Bean Balance Error", err.message);
            });

        };

        ctrl.load = function() {
            $scope.transferParams.tParams.Receiver = "";
            $scope.transferParams.tParams.Message = null;
            $scope.transferParams.tParams.Credits = null;
            ctrl.init();
        }

        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();
        //---------------------------------------
    }
]);;;

module.controller('MoreCtrl', [
    '$log', '$q', '$rootScope', '$scope', '$state',
    function($log, $q, $rootScope, $scope, $state) {
        var ctrl = this;
        $scope.isLoading = false;


        ctrl.init = function() {

        };

        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();
        //---------------------------------------
    }
]);;;

module.controller('MenuCtrl', [
    '$log', '$q', '$rootScope', '$scope', '$state',
    function($log, $q, $rootScope, $scope, $state) {
        var ctrl = this;
        $scope.isLoading = false;


        ctrl.init = function() {

        };

        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();
        //---------------------------------------
    }
]);;;

module.controller('OurMenuCtrl', [
    '$log', '$q', '$rootScope', '$scope', '$state', 'MenuService',
    function($log, $q, $rootScope, $scope, $state, MenuService) {
        var ctrl = this;
        $scope.isLoading = false;

        $scope.menuList = [];
        $scope.menuListCoffee = [];
        $scope.menuListTea = [];

        ctrl.init = function() {
            console.log("-------------getting menu-------------");
            MenuService.getMenu().then(function(data){
                if(!data)
                {
                    console.log("failed getting list for menu");
                }
                else
                {
                    console.log("Array of menu "+data[0].name);
                    $rootScope.saveMenuList(data);
                }
            }, function(err) {
                console.log("error getting list of menu");
                console.log(err);
            });

        };

        
        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();
        //---------------------------------------

        $scope.menuList = $rootScope.getMenuList();

        console.log("Array of menulist : "+JSON.stringify($scope.menuList));

        for(var x = 0; x < $scope.menuList.length; x++)
        {
            if($scope.menuList[x].category == "Coffee")
            {
                $scope.menuListCoffee.push($scope.menuList[x]);
            }
            else if($scope.menuList[x].category == "Tea")
            {
                $scope.menuListTea.push($scope.menuList[x]);
            }

        }

        $scope.divShow= "div1";

        $scope.show = function(arg){
            $scope.divShow = arg;
        };

    }
]);;;

module.controller('TransferHistoryCtrl', [
    '$log', '$q', '$rootScope', '$scope', '$state', 'TransactionHistoryService',
    function($log, $q, $rootScope, $scope, $state, $TransactionHistoryService) {
        var ctrl = this;
        $scope.isLoading = false;

        $scope.user = $rootScope.getProfile();

        ctrl.getSent = function() {
            var filter = $scope.user.username;
            $TransactionHistoryService.getSentHistory(filter).then(function(data){
                if(data == null)
                {
                    console.log("error getting sent history");
                    return;
                }
                else
                {
                    console.log("sent data: "+JSON.stringify(data));
                    $scope.sent = data;
                    return;
                }     
            });
        };

        ctrl.getReceived = function() {
            var filter = $scope.user.username;
            $TransactionHistoryService.getReceivedHistory(filter).then(function(data){
                if(data == null)
                {
                    console.log("error getting sent history");
                    return;
                }
                else
                {
                    console.log("sent data: "+JSON.stringify(data));
                    $scope.received = data;
                    return;
                }     
            });
        };

        $scope.divShow= "Sent";

        $scope.show = function(arg){
            if(arg == "Sent")
            {
                ctrl.getSent();
                $scope.divShow = arg;
            }
            else if(arg == "Received")
            {
                ctrl.getReceived();
                $scope.divShow = arg;
            }
        };

        ctrl.init = function() {

        };

        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();
        //---------------------------------------
    }
]);;;

module.controller('NewsFeedCtrl', [
    '$log', '$q', '$rootScope', '$scope', '$state', 'ReceiverService', 'NewsfeedService',
    function($log, $q, $rootScope, $scope, $state, ReceiverService, NewsfeedService) {
        var ctrl = this;
        $scope.isLoading = false;

        $scope.user = $rootScope.getProfile();

        //var userSender = "";
        /*if($scope.user.username != "")
        {
            userSender = $scope.user.username;
        }*/
        console.log("newsfeed: "+JSON.stringify($scope.user));

        $scope.newsFeed = {};

        ctrl.submitNewsfeed = function() {
            var filter = 5;
            NewsfeedService.getNewsfeed(filter).then(function(data){
                if(data == null)
                {
                    return false;
                }
                else
                {
                    console.log("newsfeed data: "+JSON.stringify(data));
                    $scope.newsFeed = data;
                    return $scope.newsFeed;
                }     
            });
        };

        $scope.divShow = "Newsfeed";

        $scope.show = function(arg){
            if(arg == 'Newsfeed')
            {
               ctrl.submitNewsfeed();
               $scope.divShow = arg;
            }
        };


        ctrl.init = function() {

        };

        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();
        //---------------------------------------
    }
]);;;

module.controller('PaymentCtrl', [
    '$log', '$q', '$rootScope', '$scope', '$state', 'TransferService', 'MenuService',
    function($log, $q, $rootScope, $scope, $state, TransferService, MenuService) {
        var ctrl = this;

        console.log("reached payment controller");
        $scope.itemsFromBarcode = [];
        $scope.itemsToPay = [];
        $scope.beanBalance = 0;

        $scope.user = $rootScope.getProfile();

        $scope.removeTagOnBackspace = function (event) {
          if (event.keyCode === 8) {
            console.log("keyCode from payment: "+JSON.stringify(event.keyCode));
            }
        };

        $scope.customGoBack = function() {
            $state.go('tab.newsFeeds');
        };

        $scope.scanCode = function()
        {
            console.log("scanCode here");

            cordova.plugins.barcodeScanner.scan(function(barcode) {

                atajo.log.d("BARCODE SCANNED IS : " + JSON.stringify(barcode));

                var x = "";
                var y = "";
                $scope.itemsFromBarcode = [];
                $scope.itemsToPay = [];

                atajo.log.d(barcode.text);

                atajo.log.d("items split : "+barcode.text.split(" , "));

                $scope.itemsFromBarcode = barcode.text.split(" , ");

                for(var i in $scope.itemsFromBarcode)
                {
                    if($scope.itemsFromBarcode[i].length > 0)
                    {
                         x = $scope.itemsFromBarcode[i].substring(0,$scope.itemsFromBarcode[i].indexOf(':'));
                         y = $scope.itemsFromBarcode[i].substring($scope.itemsFromBarcode[i].indexOf(':')+1);

                         $scope.itemsToPay.push({
                             name:x,
                             qty:y
                         });
                    }
                }

                atajo.log.d("list to pay "+JSON.stringify($scope.itemsToPay));
                $rootScope.saveListToPay($scope.itemsToPay);
                
                ctrl.showSummaryPayment();

            }, function(err) {

                atajo.log.e("SCAN ERROR : " + err);

            });

        };  

        ctrl.showSummaryPayment = function() {
                    $scope.itemsToPay = $rootScope.getListToPay();

                    var total = 0;
                    var menuList = [];
                    var itemsToPay = [];
                    menuList = $rootScope.getMenuList();

                    if(menuList.length < 0)
                    {
                         MenuService.getMenu().then(function(data){
                            if(!data)
                            {
                                console.log("failed getting list for menu");
                            }
                            else
                            {
                                console.log("Array of menu "+data[0].name);
                                $rootScope.saveMenuList(data);
                            }
                        }, function(err) {
                            console.log("error getting list of menu");
                            console.log(err);
                        });
                        menuList = $rootScope.getMenuList();
                    }

                    itemsToPay = $rootScope.getListToPay();
                    console.log("menu items : "+JSON.stringify(menuList));

                    for(var x in itemsToPay)
                    {
                        for(var y in menuList)
                        {
                            if(menuList[y].name == itemsToPay[x].name.trim())
                            {
                                 console.log("true ready to add");
                                 total += parseInt(itemsToPay[x].qty) * parseInt(menuList[y].price);
                                 console.log("menu "+menuList[y].price + " item " +itemsToPay[x].qty);
                             }
                             //console.log("menu "+menuList[y].name + " item" +itemsToPay[x].name);
                         }
                    }

                    console.log("Amount to pay "+total);
                    $scope.totalSummary = 0;
                    $scope.totalSummary = total;

                    var template =
                        '<aui-list><aui-item ng-repeat="items in itemsToPay">' +
                       // '<h4>Summary Payment</h4>' +
                        '<p style="white-space: pre-wrap;">{{items.name}} {{items.qty}}</p>' +
                        '</aui-item>' +
                        '<aui-item>' +
                        '<p style="white-space: pre-wrap"> Total : {{totalSummary}}'
                        '</aui-item>' +
                        '</aui-list>';
                    $rootScope.confirmPopup("Summary Payment", template, {
                        scope: $scope
                    }).then(function(res) {
                        
                    if(res) {
                        console.log("continue");
                        var beanBalance = 0;

                        TransferService.getBeanBalance($scope.user.username).then(function(data){
                             //$rootScope.alertTitleMessage("Message Balance", JSON.stringify(data));
                             $scope.beanBalance = data;
                             console.log("Bean Balance : "+$scope.beanBalance);
                             return $scope.beanBalance;
                         }, function(err){
                            $rootScope.alertTitleMessage("Bean Balance Error", err.message);
                         });

                            console.log("bean balance from payment: "+$scope.beanBalance);
                            var checkBeanBalance = 0;
                            checkBeanBalance = parseInt($scope.beanBalance);
                            console.log("check balance : "+checkBeanBalance);
                            if(checkBeanBalance > 0)
                            {
                                if(checkBeanBalance >= total)
                                {
                                    console.log("going to pay now");
                                    ctrl.submitPayment(itemsToPay, total);
                                }
                                else{
                                    console.log("not enough to make payment");
                                    $rootScope.alertTitleMessage("Message ", "You do not have enough to make payment");
                                }
                            }

                        }
                    });
                };


        ctrl.submitPayment = function(items,total) {
            var receiver = "_fistbump";
            var sender = $scope.user.username;
            var transferData = {
                topic: " ",
                message: JSON.stringify(items),
                credits: total,
               // requestedBy: sender 
            };

            //var sender = $scope.transfer.Sender;
            var params = sender +"/"+receiver;
            TransferService.performPayment(params, transferData).then(function(data){
                if(data[0].result == true)
                {
                    console.log("success payment");
                    $rootScope.alertTitleMessage("Message ", "You have successfully made the purchase");
                }
                else if(data[0].result == false)
                {
                    console.log("failed");
                }
                else
                {
                    $rootScope.alertTitleMessage("Message ", JSON.stringify(data));
                }
            }, function(err){
                $rootScope.alertTitleMessage("Payment Error", err.message);
            });

            //ctrl.load();

        };
        
        ctrl.init = function() {


        };

        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();
        //---------------------------------------
    }
]);;;