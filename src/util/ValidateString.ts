import { Validatable } from "./Validatable";

export module ValidateString {
  export function requiredCheck(
    isValid: boolean,
    validateInput: Validatable.Validatable
  ) {
    if (validateInput.required) {
      //if the required var is set and true (not undefined) then value must not be empty
      //checks if value is empty after trimming the string
      isValid = isValid && validateInput.value.toString().trim().length !== 0; //if minLength is set then it should have a min length. only checks strings
      return isValid;
    }
    return false;
  }

  export function minLengthCheck(
    isValid: boolean,
    validateInput: Validatable.Validatable
  ) {
    if (
      validateInput.minLength != null &&
      typeof validateInput.value === "string"
    )
      isValid =
        isValid && validateInput.value.length > validateInput.minLength!;
    return isValid;
  }

  export function maxLengthCheck(
    isValid: boolean,
    validateInput: Validatable.Validatable
  ) {
    if (
      validateInput.maxLength != null &&
      typeof validateInput.value === "string"
    )
      isValid =
        isValid && validateInput.value.length < validateInput.maxLength!;
    return isValid;
  }
}
