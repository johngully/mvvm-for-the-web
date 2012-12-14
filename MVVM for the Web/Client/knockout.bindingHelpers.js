// ISO 8501 date binding handler for input values
ko.bindingHandlers.dateValue = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        // Update the value when the user leaves the field
        $(element).blur(function () {
            var value = valueAccessor();
            value(element.value);
        });
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var valueUnwrapped = ko.utils.unwrapObservable(valueAccessor());
        if (!valueUnwrapped) {
            return;
        }

        var formattedDate = valueUnwrapped.substr(0, 10);
        element.value = formattedDate;
    }
};

// ISO 8501 date binding handler for display only
ko.bindingHandlers.date = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {

    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var valueUnwrapped = ko.utils.unwrapObservable(valueAccessor());
        var date = new Date(valueUnwrapped);

        var year = date.getUTCFullYear();
        var month = ("0" + (date.getUTCMonth() + 1)).substr(-2);
        var day = date.getUTCDate();

        var formattedDate = month + "/" +
                            day + "/" +
                            year;
        element.innerText = formattedDate;
    }
};

ko.bindingHandlers.undefinedToVisibilityConverter = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var valueUnwrapped = ko.utils.unwrapObservable(valueAccessor());
        if (!valueUnwrapped) {
            $(element).hide();
        }
        else {
            $(element).show();
        }
    }
};