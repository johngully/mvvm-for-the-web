var ri = ri || {}; //reference implementation namespace

ri.ordersViewModel = (function () {
    // private properties/methods
    var entityCollection = ko.observable();
    var entity = ko.observable().publishOn("SelectOrder");
    var ordersService = ko.observable();
    
    var init = function (dataService) {
        ordersService = dataService;
    };

    var load = function () {
        return ordersService.getOrders()
        .success(function (data) {
            // NOTE: It is important to put the additional () 
            //       on the end of the mapping call.
            var orders = ko.mapping.fromJS(data)();
            entityCollection(orders);
            entity(orders[0]); // Select the first order
        })
        .error(function (xhr, status, error) {
            ko.postbox.publish("ErrorMessage", "Orders could not be loaded");
        });
    };

    var select = function (order) {
        entity(order);
    };

    return {
        // public properties/methods
        init: init,
        load: load,
        select: select,
        entityCollection: entityCollection,
        entity: entity
    };
}());