/**
 * Created by xz_liu on 2016/3/9.
 */
var app = angular.module('app');

app.controller('OrderIndex', function ($scope, $http, $route) {
    document.title = 'Order List';

    $http.get('/orders').success(function (result) {
        $scope.orders = result;
    });

    $scope.deleteOrder = function (_id) {
        $http.delete('/orders/' + _id).success(function (result) {
            $route.reload();
        });
    };
});

var fruits = [
    {
        fruit_name: 'Apple',
        unit_price: 1.2,
        fruit_quantity: 0,
        selectd: false
    },
    {
        fruit_name: 'Banana',
        unit_price: 2.3,
        fruit_quantity: 0,
        selectd: false
    },
    {
        fruit_name: 'Pitaya',
        unit_price: 3.4,
        fruit_quantity: 0,
        selectd: false
    },
    {
        fruit_name: 'Mango',
        unit_price: 4.5,
        fruit_quantity: 0,
        selectd: false
    }];

app.controller('OrderCreate', function ($scope, $http, $location) {
    document.title = 'Order Create';

    $scope.fruits = fruits;

    $scope.order = {
        customer: 'leo',
        amount: 0,
        delivery_date: new Date(),
        fruits: []
    };

    $scope.calcTotalAmount = function () {
        var total = 0;
        for (var i in $scope.fruits) {
            var fruit = $scope.fruits[i];
            if (fruit.selectd) {
                total += fruit.unit_price * fruit.fruit_quantity;
            }
        }
        $scope.order.amount = total;
    };

    $scope.createOrder = function (order) {
        for (var i in $scope.fruits) {
            var fruit = $scope.fruits[i];
            if (fruit.selectd) {
                order.fruits.push({
                    fruit_name: fruit.fruit_name,
                    fruit_quantity: fruit.fruit_quantity
                });
            }
        }

        $http.post('/orders', order).success(function (result) {
            if (!result.code) {
                $location.path('/order/detail/' + result);
            }
        });
    };
});

app.controller('OrderDetail', function ($scope, $http, $routeParams) {
    document.title = 'Order Detail';

    var _id = $routeParams._id;
    $http.get('/orders/' + _id).success(function (result) {
        if (!result.code) {
            $scope.order = result;
        }
    });
});