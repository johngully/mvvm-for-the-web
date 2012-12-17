(function () {
    var orderViewModel;

    describe("OrderViewModel", function () {
        before(function () {
            orderViewModel = ri.orderViewModel;
            orderViewModel.init(ri.ordersService);
        });

        after(function () {
            orderViewModel = undefined;
        });

        // OrderViewModel Tests
        describe("Init", function () {
            it("should require a service", function () {
                var badService = undefined;
                // Wrap the ViewModel's init method in a function
                // so that the throw assertion can execute it.
                var init = function () {
                    orderViewModel.init(badService);
                };
                init.should.throw(/Argument undefined:/);
            });
        }); // describe Init

        describe("Load", function () {
            it("should load an order", function (done) {
                var orderId = 1;
                orderViewModel.load(orderId)
                .complete(function (request, status) {
                    status.should.equal("success");
                    orderViewModel.entity().should.exist;
                    orderViewModel.entity().OrderId().should.equal(orderId);
                    done();
                });
                server.respond();
            });
        }); // describe Load

        describe("Save", function () {
            it("should save an order", function (done) {
                var orderId = 1;
                var orderDate;

                orderViewModel.load(orderId)
                .complete(function (request, status) {
                    status.should.equal("success");
                    orderViewModel.entity().should.exist;
                    orderViewModel.entity().OrderId().should.equal(orderId);

                    // Store the original order date
                    orderDate = orderViewModel.entity().OrderDate();

                    orderViewModel.save()
                    .complete(function (request, status) {
                        status.should.equal("success");
                        orderViewModel.entity().should.exist;
                        orderViewModel.entity().OrderId().should.equal(orderId);

                        // Ensure the order date has been updated
                        orderViewModel.entity().OrderDate().should.be.greaterThan(orderDate);
                        done();
                    });
                });
                server.respond();
            });
        }); // describe Save

    }); // describe OrdersViewModel
}).call(this);