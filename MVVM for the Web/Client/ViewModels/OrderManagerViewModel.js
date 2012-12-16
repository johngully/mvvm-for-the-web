var ri = ri || {}; //reference implementation namespace

ri.orderManagerViewModel = (function () {
    // private properties/methods
    var ordersService;
    var messagingViewModel = ko.observable();
    var ordersViewModel = ko.observable();
    var orderViewModel = ko.observable();

    var init = function (service, messaging, orders, order) {
        ordersService = service;
        messagingViewModel(messaging);
        ordersViewModel(orders);
        orderViewModel(order);

        // Initialize the child ViewModels
        ordersViewModel().init(ordersService);
        orderViewModel().init(ordersService);
    };    

    return {
        // public properties/methods
        init: init,
        messagingViewModel: messagingViewModel,
        ordersViewModel: ordersViewModel,
        orderViewModel: orderViewModel,
    };
}());
