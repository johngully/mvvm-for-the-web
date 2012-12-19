(function () {
    var messagingViewModel;
    var errorMessageName = "ErrorMessage";
    var successMessageName = "SuccessMessage"
    var successMessageDuration = 250;

    describe("MessagingViewModel", function () {
        before(function () {
            ko.postbox.publish.restore();
            ko.postbox.subscribe.restore();
            messagingViewModel = ri.messagingViewModel;
            messagingViewModel.init(successMessageDuration)
        });

        after(function () {
            messagingViewModel = undefined;
            sinon.stub(ko.postbox, "publish");
            sinon.stub(ko.postbox, "subscribe");
        });

        // MessagingViewModel Tests
        describe("ErrorMessage", function () {
            it("should subscribe to messages named: '" + errorMessageName + "'", function () {
                var testMessage = "Test error message";
                should.not.exist(messagingViewModel.errorMessage());
                ko.postbox.publish(errorMessageName, testMessage);
                messagingViewModel.errorMessage().should.equal(testMessage);
            });

            it("should should not subscribe to other messages", function () {
                var testMessage = "Test success message";
                should.not.exist(messagingViewModel.errorMessage());
                ko.postbox.publish(successMessageName, testMessage);
                should.not.exist(messagingViewModel.errorMessage());
            });
        });

        describe("SuccessMessage", function () {
            it("should subscribe to messages named: '" + successMessageName + "'", function () {
                var testMessage = "Test success message";
                should.not.exist(messagingViewModel.successMessage());
                ko.postbox.publish(successMessageName, testMessage);
                messagingViewModel.successMessage().should.equal(testMessage);
            });

            it("should should not subscribe to other messages", function () {
                var testMessage = "Test error message";
                should.not.exist(messagingViewModel.successMessage());
                ko.postbox.publish(successMessageName, testMessage);
                should.not.exist(messagingViewModel.successMessage());
            });

            it("should auto dismiss after a period of time (" + successMessageDuration + "ms)", function (done) {
                var testMessage = "Test success message";
                should.not.exist(messagingViewModel.successMessage());

                // Publish the message
                ko.postbox.publish(successMessageName, testMessage);
                messagingViewModel.successMessage().should.equal(testMessage);

                // Wait for the message duration and ensure the message has been dismissed
                setTimeout(function () {
                    should.not.exist(messagingViewModel.successMessage());
                    done();
                }, successMessageDuration);
            });
        });
    }); // describe OrdersViewModel
}).call(this);