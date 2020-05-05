export var ValidateNumber;
(function (ValidateNumber) {
    function minValueCheck(isValid, validateInput) {
        if (validateInput.min != null && typeof validateInput.value === "number")
            isValid = isValid && validateInput.value > validateInput.min;
        return isValid;
    }
    ValidateNumber.minValueCheck = minValueCheck;
    function maxValueCheck(isValid, validateInput) {
        if (validateInput.max != null && typeof validateInput.value === "number")
            isValid = isValid && validateInput.value < validateInput.max;
        return isValid;
    }
    ValidateNumber.maxValueCheck = maxValueCheck;
})(ValidateNumber || (ValidateNumber = {}));
//# sourceMappingURL=ValidateNumber.js.map