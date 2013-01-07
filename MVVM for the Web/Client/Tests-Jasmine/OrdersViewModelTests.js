/// <reference path="lib/jasmine-1.3.1/jasmine.js" />
/// <reference path="lib/jasmine.async.min.js" />
/// <reference path="lib/sinon-1.5.2.js" />
/// <reference path="../../Scripts/jquery-1.7.1.min.js" />
/// <reference path="../../Scripts/knockout-2.2.0.js" />
/// <reference path="../../Scripts/knockout-postbox.min.js" />
/// <reference path="../../Scripts/knockout.mapping-latest.js" />
/// <reference path="../Services/OrdersService.js" />
/// <reference path="../ViewModels/OrdersViewModel.js" />
/// <reference path="OrdersServiceFake.js" />
var async = new AsyncSpec(this);

describe("OrdersViewModel", function () {
    var ordersViewModel;

    beforeEach(function () {
        ordersViewModel = ri.ordersViewModel;
        ordersViewModel.init(ri.ordersService);
    });

    afterEach(function () {
        ordersViewModel = undefined;
    });


    describe("Init", function () {
        it("should require a service", function () {
            var badService = undefined;
            // Wrap the ViewModel's init method in a function
            // so that the throw assertion can execute it.
            var init = function () {
                ordersViewModel.init(badService);
            };
            expect(init).toThrow(new ReferenceError("Argument undefined: dataService"));
        });
    }); // describe Init


    describe("Load", function () {
        async.it("should load 2 orders", function (done) {
            ordersViewModel.load()
            .complete(function (request, status) {
                expect(status).toEqual("success");
                expect(ordersViewModel.entityCollection().length).toEqual(2);
                done();
            });
            server.respond();
        });
    }); // describe Load


    describe("Select", function () {
        async.it("should initially select the first order", function (done) {
            ordersViewModel.load()
            .complete(function (request, status) {
                var firstOrder = ordersViewModel.entityCollection()[0];
                expect(firstOrder).toBeTruthy();
                expect(firstOrder).toEqual(ordersViewModel.entity());
                done();
            });
            server.respond();
        });
        
        async.it("should select the second order when it is selected", function (done) {
            ordersViewModel.load()
            .complete(function (request, status) {
                var selectedOrder = ordersViewModel.entityCollection()[1];
                expect(selectedOrder).toBeTruthy();
                ordersViewModel.select(selectedOrder);
                expect(selectedOrder).toEqual(ordersViewModel.entity());
                done();
            });
            server.respond();
        });
    }); // describe Select
});