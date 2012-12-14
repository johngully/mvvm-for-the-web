var ri = ri || {}; //reference implementation namespace

ri.messagingViewModel = (function () {
    // private properties/methods
    var errorMessage = ko.observable().subscribeTo("ErrorMessage", true);
    var successMessage = ko.observable().subscribeTo("SuccessMessage", true);

    successMessage.subscribe(function () {
        if (successMessage() === undefined) {
            return;
        }

        setTimeout(function () {
            successMessage(undefined);
        }, 2000);
    });

    return {
        // public properties/methods
        errorMessage: errorMessage,
        successMessage: successMessage
    };
}());
