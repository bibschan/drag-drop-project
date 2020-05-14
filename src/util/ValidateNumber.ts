// ValidateNumber
import { Validatable } from "./Validatable";

export module ValidateNumber {
  export function minValueCheck(
    isValid: boolean,
    validateInput: Validatable.Validatable
  ) {
    if (validateInput.min != null && typeof validateInput.value === "number")
      isValid = isValid && validateInput.value >= validateInput.min;
    return isValid;
  }

  export function maxValueCheck(
    isValid: boolean,
    validateInput: Validatable.Validatable
  ) {
    if (validateInput.max != null && typeof validateInput.value === "number")
      isValid = isValid && validateInput.value <= validateInput.max;
    return isValid;
  }
}
