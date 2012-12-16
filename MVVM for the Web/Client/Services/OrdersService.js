var ri = ri || {}; //reference implementation namespace

ri.ordersService = (function () {

    var getOrders = function () {
        var url = "/api/orders";
        return $.getJSON(url);
    };

    var getOrder = function (id) {
        var url = "/api/orders/"+id;
        return $.getJSON(url);
    };

    var saveOrder = function (order) {
        var url = "/api/orders";
        return $.ajax({
            url: url,
            type: 'PUT',
            data: order});
    };

    return {
        getOrders: getOrders,
        getOrder: getOrder,
        saveOrder: saveOrder
    };
})();