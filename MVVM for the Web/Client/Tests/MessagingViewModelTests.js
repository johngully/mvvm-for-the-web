(function () {
    var server;
    var messagingViewModel;

    describe("MessagingViewModel", function () {
        before(function () {
            server = sinon.fakeServer.create();
            messagingViewModel = ri.messagingViewModel;
        });

        after(function () {
            messagingViewModel = undefined;
            server.restore();
        });

        // MessagingViewModel Tests

                
    }); // describe OrdersViewModel
}).call(this);