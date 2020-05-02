export var ValidateFunctions;
(function (ValidateFunctions) {
    function ifString(validateInput) {
        if (typeof validateInput.value === "string")
            return true;
        return false;
    }
    ValidateFunctions.ifString = ifString;
    function notNull(validateInput) {
        if (validateInput.minLength != null)
            return true;
        return false;
    }
    ValidateFunctions.notNull = notNull;
})(ValidateFunctions || (ValidateFunctions = {}));
//# sourceMappingURL=ValidateFunctions.js.map