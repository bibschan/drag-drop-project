// if (
//     validateInput.minLength != null &&
//     typeof validateInput.value === "string"
//   )
//     isValid = isValid && validateInput.value.length > validateInput.minLength;
//   //if maxLength is set, then it should have a max length.
//   if (
//     validateInput.maxLength != null &&
//     typeof validateInput.value === "string"
//   )
//     isValid = isValid && validateInput.value.length < validateInput.maxLength;
//   //the following checks if the input is bigger than the min value
//   if (validateInput.min != null && typeof validateInput.value === "number")
//     isValid = isValid && validateInput.value > validateInput.min;
//   //the following checks if the input is smaller than the max value
//   if (validateInput.max != null && typeof validateInput.value === "number")
//     isValid = isValid && validateInput.value < validateInput.max;
//   return isValid;

import { Valitadable } from "Validatable";

export module ValidateFunctions {
  export function ifString(validateInput: Valitadable.Validatable): boolean {
    if (typeof validateInput.value === "string") return true;
    return false;
  }

  export function notNull(validateInput: Valitadable.Validatable): boolean {
    if (validateInput.minLength != null) return true;
    return false;
  }
}
