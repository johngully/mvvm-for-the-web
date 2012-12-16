var ri = ri || {}; //reference implementation namespace

ri.orderViewModel = (function () {
    // private properties/methods
    var entityCollection = ko.observable();
    var entity = ko.observable().subscribeTo("SelectOrder", true);
    var ordersService = ko.observable();

    var init = function (dataService) {
        ordersService = dataService;
    };

    var load = function (orderId) {
        return ordersService.getOrder(orderId)
        .success(function (data) {
            // NOTE: The ko.mapping documentation states that you can 
            //       map to a specified target object, but the following
            //       code does not appear to funcation as documented.
            //ko.mapping.fromJS(data, {}, entity);
            entity(ko.mapping.fromJS(data));
        })
        .error(function (xhr, status, error) {
            ko.postbox.publish("ErrorMessage", "Order could not be loaded");
        });
    };

    var save = function () {
        var order = ko.toJS(entity);
        ordersService.saveOrder(order)
        .success(function (data) {
            entity(ko.mapping.fromJS(data));
            ko.postbox.publish("SuccessMessage", "Order saved successfully");
        })
        .error(function (xhr, status, error) {
            ko.postbox.publish("ErrorMessage", "Order could not be saved");
        });
    };

    ko.postbox.subscribe("SelectOrder", function (order) {
        if (order === undefined && order.OrderId() === undefined) {
            return;
        }

        load(order.OrderId());
    });

    return {
        // public properties/methods
        init: init,
        entityCollection: entityCollection,
        entity: entity,
        load: load,
        save: save
    };
}());