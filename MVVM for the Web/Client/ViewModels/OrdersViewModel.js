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
            ko.mapping.fromJS(data, {}, entityCollection);

            // Select the first order
            if (entityCollection().length) {
                var firstOrder = entityCollection()[0];
                select(firstOrder);
            }
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