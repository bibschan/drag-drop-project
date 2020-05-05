export var ValidateString;
(function (ValidateString) {
    function requiredCheck(isValid, validateInput) {
        if (validateInput.required)
            isValid = isValid && validateInput.value.toString().trim().length !== 0;
        return isValid;
    }
    ValidateString.requiredCheck = requiredCheck;
    function minLengthCheck(isValid, validateInput) {
        if (validateInput.minLength != null &&
            typeof validateInput.value === "string")
            isValid =
                isValid && validateInput.value.length > validateInput.minLength;
        return isValid;
    }
    ValidateString.minLengthCheck = minLengthCheck;
    function maxLengthCheck(isValid, validateInput) {
        if (validateInput.maxLength != null &&
            typeof validateInput.value === "string")
            isValid =
                isValid && validateInput.value.length < validateInput.maxLength;
        return isValid;
    }
    ValidateString.maxLengthCheck = maxLengthCheck;
})(ValidateString || (ValidateString = {}));
//# sourceMappingURL=ValidateString.js.map