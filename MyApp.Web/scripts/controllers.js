(function () {
    angular.module("starter.controllers", ['ionic', 'UserService'])
        .controller('loginCtrl', function ($scope, account, $state, $http, $cookies, $cookieStore, $ionicLoading, $timeout) {
            var i = 0;
            $scope.name = 'login';
            $scope.isValid = false;
            $scope.error = '';
            $scope.user = { userName: "user1", password: "user1" };

            $scope.login = function (user) {
                $ionicLoading.show({ template: '<ion-spinner icon="ios"></ion-spinner>', noBackdrop: true });
                // https://angularjs.org/greet.php?callback=JSON_CALLBACK&name=Super%20Hero

                account.checkLogin(user)
                .then(function (data) {
                    $ionicLoading.hide();
                    if (angular.isObject(data)) {
                        $cookieStore.put('user', data);
                        var data1 = $cookieStore.get('user');
                        $state.go("tab.NSD", {}, { reload: true });
                        $scope.isValid = true;
                        $scope.error = 'login successfully!';
                    } else {
                        $scope.isValid = false;
                        $scope.error = 'login failed!';
                    }
                    $ionicLoading.hide();
                }, function (error, state, status) {
                    $scope.isValid = false;
                    $scope.error = 'login error!';
                    $ionicLoading.hide();
                });
            };
        })

         .controller('AverageCtrl', function ($scope) {
             $scope.$on('OptionChange', function (event, msg) {
                 $scope.$broadcast("AvgOptionChange", msg);
             })


         })

         .controller('AverageDetailCtrl', function ($scope, account, $state, $http, $cookies, $cookieStore, $ionicLoading, $timeout, $ionicActionSheet, $ionicListDelegate, $ionicScrollDelegate) {

             $scope.noMoreItemsAvailable = false;
             $scope.items = [];
             $scope.curPageIndex = 0;
             $scope.occupation = null;

             function Getlist(occupation, pageSize, pageIndex) {
                 account.GetAll(occupation, pageSize, pageIndex).then(function (data) {
                     angular.forEach(data.Data, function (value, key) {
                         $scope.items.push(value);
                     });

                     $scope.noMoreItemsAvailable = (data.total <= pageSize * (pageIndex)) ? true : false;
                     $scope.$broadcast('scroll.infiniteScrollComplete');
                     $scope.curPageIndex = pageIndex;

                 });
             }

             $scope.doRefresh = function () {
                 $ionicLoading.show({ template: '<ion-spinner icon="ios"></ion-spinner>', noBackdrop: true });
                 account.GetAll($scope.occupation, 10, 1).then(function (data) {
                     $scope.items = data.Data;
                     $scope.noMoreItemsAvailable = (data.total <= 10) ? true : false;
                     $timeout($scope.$broadcast('scroll.refreshComplete'), 30);
                     $scope.curPageIndex = 1;
                     $ionicScrollDelegate.scrollTop();
                 }).finally(function () {
                     $ionicLoading.hide();
                 });


             };
             $scope.loadMore = function () {

                 $timeout(function () {
                     if ($scope.noMoreItemsAvailable) {
                         $scope.$broadcast('scroll.infiniteScrollComplete');
                         return;
                     }
                     var index = $scope.curPageIndex + 1;
                     Getlist($scope.occupation, 10, index);


                 }, 1000);

             };

             $scope.$on('stateChangeSuccess', function () {
                 $scope.loadMore();
             });


             // Triggered on a button click, or some other target
             $scope.filter = function () {
                 var buttons = [
                 { text: '全部' },
                 {
                     text: '老师'
                 },
                 {
                     text: '会计'
                 },
                 {
                     text: '建筑师'
                 },
                 {
                     text: '演员'
                 },
                 {
                     text: '学生'
                 },
                 {
                     text: '其他'
                 }
                 ]
                 buttons[$scope.occupation || 0].text = buttons[$scope.occupation || 0].text + '  <span  class="ion-checkmark-round" ></span>';

                 // Show the action sheet
                 var hideSheet = $ionicActionSheet.show({
                     buttons: buttons,
                     //destructiveText: 'Delete',
                     titleText: '<b>请选择职业</b>',
                     cancelText: '取消',
                     cancel: function () {
                         // add cancel code..
                     },
                     buttonClicked: function (index) {
                         if ($scope.occupation != (index == 0 ? null : index)) {
                             $scope.occupation = index == 0 ? null : index;

                             $scope.doRefresh()
                         }
                         return true;
                     }
                 });
             };
         })

        .controller('NavController', function ($scope, $ionicSideMenuDelegate) {
            //$ionicSideMenuDelegate.canDragContent(false);
            //$ionicSideMenuDelegate.enableMenuWithBackViews =false;
            $scope.cancel = function () {

                //$scope.$broadcast("OptionChange", $scope.ManagerTypeList);
                $ionicSideMenuDelegate.toggleLeft(false);
            };

            $scope.submit = function () {

                $scope.$emit("OptionChange", $scope.ManagerTypeList);
                $ionicSideMenuDelegate.toggleLeft(false);
            };
            $scope.ManagerTypeList = [{ text: "0", checked: false }, {
                text: "1", checked: false
            }, { text: "2", checked: false },
            {
                text: "3", checked: false
            }, {
                text: "0~3", checked: false
            }];

            $scope.ZhibiaoList = [
                    {
                        text: "绩效", checked: false
                    }, {
                        text: "新进率", checked: false
                    }, {
                        text: "停职率", checked: false
                    }, {
                        text: "复职率", checked: false
                    }, {
                        text: ".....", checked: false
                    }];
        })

         .controller('NSDCtrl', function ($scope) { })

         .controller('MyCtrl', function ($scope) { })

        .controller('AccountCtrl', function ($scope, $state, $cookies, $cookieStore) {
            $scope.logoff = function () {
                $cookieStore.remove('user');
                $state.go("loginState", {}, { reload: true });
            };
            $scope.account = $cookieStore.get('user');
        })

        .controller('NSDCtrl', function ($scope, account, $state, $http, $cookies, $cookieStore, $ionicLoading, $timeout, $ionicActionSheet, $ionicListDelegate, $ionicScrollDelegate) {

            $scope.noMoreItemsAvailable = false;
            $scope.items = [];
            $scope.curPageIndex = 0;
            $scope.occupation = null;

            function Getlist(occupation, pageSize, pageIndex) {
                account.GetAll(occupation, pageSize, pageIndex).then(function (data) {
                    angular.forEach(data.Data, function (value, key) {
                        $scope.items.push(value);
                    });

                    $scope.noMoreItemsAvailable = (data.total <= pageSize * (pageIndex)) ? true : false;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.curPageIndex = pageIndex;

                });
            }

            $scope.doRefresh = function () {
                $ionicLoading.show({ template: '<ion-spinner icon="ios"></ion-spinner>', noBackdrop: true });
                account.GetAll($scope.occupation, 10, 1).then(function (data) {
                    $scope.items = data.Data;
                    $scope.noMoreItemsAvailable = (data.total <= 10) ? true : false;
                    $timeout($scope.$broadcast('scroll.refreshComplete'), 30);
                    $scope.curPageIndex = 1;
                    $ionicScrollDelegate.scrollTop();
                }).finally(function () {
                    $ionicLoading.hide();
                });


            };
            $scope.loadMore = function () {

                $timeout(function () {
                    if ($scope.noMoreItemsAvailable) {
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        return;
                    }
                    var index = $scope.curPageIndex + 1;
                    Getlist($scope.occupation, 10, index);


                }, 1000);

            };

            $scope.$on('stateChangeSuccess', function () {
                $scope.loadMore();
            });


            // Triggered on a button click, or some other target
            $scope.filter = function () {
                var buttons = [
                { text: '全部' },
                {
                    text: '老师'
                },
                {
                    text: '会计'
                },
                {
                    text: '建筑师'
                },
                {
                    text: '演员'
                },
                {
                    text: '学生'
                },
                {
                    text: '其他'
                }
                ]
                buttons[$scope.occupation || 0].text = buttons[$scope.occupation || 0].text + '  <span  class="ion-checkmark-round" ></span>';

                // Show the action sheet
                var hideSheet = $ionicActionSheet.show({
                    buttons: buttons,
                    //destructiveText: 'Delete',
                    titleText: '<b>请选择职业</b>',
                    cancelText: '取消',
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        if ($scope.occupation != (index == 0 ? null : index)) {
                            $scope.occupation = index == 0 ? null : index;

                            $scope.doRefresh()
                        }
                        return true;
                    }
                });
            };
        });
})();

