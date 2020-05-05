import { ValidateNumber } from "ValidateNumber";
import { ValidateString } from "ValidateString";
export var Validatable;
(function (Validatable) {
    function validate(validateInput) {
        let isValid = true;
        isValid = ValidateString.requiredCheck(isValid, validateInput);
        isValid = ValidateString.maxLengthCheck(isValid, validateInput);
        isValid = ValidateString.minLengthCheck(isValid, validateInput);
        isValid = ValidateNumber.minValueCheck(isValid, validateInput);
        isValid = ValidateNumber.maxValueCheck(isValid, validateInput);
        return isValid;
    }
    Validatable.validate = validate;
})(Validatable || (Validatable = {}));
//# sourceMappingURL=Validatable.js.map