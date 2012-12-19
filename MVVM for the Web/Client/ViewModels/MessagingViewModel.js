var ri = ri || {}; //reference implementation namespace

ri.messagingViewModel = (function () {
    // private properties/methods
    var dismissDuration = 2000;
    var errorMessage = ko.observable().subscribeTo("ErrorMessage", true);
    var successMessage = ko.observable().subscribeTo("SuccessMessage", true);

    var init = function (duration) {
        // Override the dismiss duration if a duration is provided
        if (duration) {
            dismissDuration = duration
        }
    };

    successMessage.subscribe(function () {
        if (successMessage() === undefined) {
            return;
        }

        setTimeout(function () {
            successMessage(undefined);
        }, dismissDuration);
    });

    return {
        // public properties/methods
        init: init,
        errorMessage: errorMessage,
        successMessage: successMessage
    };
}());
