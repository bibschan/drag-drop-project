//input validation interface - creates the structure of the object that will
//be passed into the validate function

import { ValidateNumber } from "./ValidateNumber";
import { ValidateString } from "./ValidateString";

export module Validatable {
  export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  //validation function
  export function validate(validateInput: Validatable) {
    let isValid = true; //we set this to false as soon as any variable fails the test

    isValid = isValid && ValidateString.requiredCheck(isValid, validateInput);
    isValid = isValid && ValidateString.maxLengthCheck(isValid, validateInput);
    isValid = isValid && ValidateString.minLengthCheck(isValid, validateInput);
    isValid = isValid && ValidateNumber.minValueCheck(isValid, validateInput);
    isValid = isValid && ValidateNumber.maxValueCheck(isValid, validateInput);

    return isValid;
  }
}
