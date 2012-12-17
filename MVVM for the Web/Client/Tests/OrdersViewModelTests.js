(function () {
    var ordersViewModel;

    describe("OrdersViewModel", function () {
        before(function () {
            //server.restore();
            ordersViewModel = ri.ordersViewModel;
            ordersViewModel.init(ri.ordersService);
        });

        after(function () {
            ordersViewModel = undefined;
        });

        // OrdersViewModel Tests
        describe("Init", function () {
            it("should require a service", function () {
                var badService = undefined;
                // Wrap the ViewModel's init method in a function
                // so that the throw assertion can execute it.
                var init = function () {
                    ordersViewModel.init(badService);
                };
                init.should.throw(/Argument undefined:/);
            });
        }); // describe Init
        
        describe("Load", function () {
            it("should load 2 orders", function (done) {
                ordersViewModel.load()
                .complete(function (request, status) {
                    status.should.equal("success");
                    ordersViewModel.entityCollection().should.have.length(2);
                    done();
                });
                server.respond();
            });
        }); // describe Load

        describe("Select", function () {
            it("should initially select the first order", function (done) {
                ordersViewModel.load()
                .complete(function (request, status) {
                    var firstOrder = ordersViewModel.entityCollection()[0];
                    firstOrder.should.not.be.null;
                    ordersViewModel.entity().should.equal(firstOrder);
                    done();
                });
                server.respond();
            });

            it("should select the second order when it is selected", function (done) {
                ordersViewModel.load()
                .complete(function (request, status) {
                    var selectedOrder = ordersViewModel.entityCollection()[1];
                    selectedOrder.should.not.be.null;
                    ordersViewModel.select(selectedOrder);
                    ordersViewModel.entity().should.equal(selectedOrder);
                    done();
                });
                server.respond();
            });

            // TODO: Test message publishing


        }); // describe Select
    }); // describe OrdersViewModel
}).call(this);