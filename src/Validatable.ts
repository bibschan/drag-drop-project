//input validation interface - creates the structure of the object that will
//be passed into the validate function
// import { ValidateFunctions } from "ValidateFunctions";

import { ValidateFunctions } from "./ValidateFunctions";

export module Valitadable {
  export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  //validation function
  export function Validate(validateInput: Validatable) {
    //we set this to false as soon as any var fails the test
    let isValid = true;

    if (validateInput.required)
      //if the required var is set and true (not undefined) then value must not be empty
      //checks if value is empty after trimming the string
      isValid = isValid && validateInput.value.toString().trim().length !== 0;
    //if minLength is set then it should have a min length. only checks strings, doesnt make sense
    //to check length if a number
    //
    //
    //
    //
    //Carol, aqui está o problema, se eu uso as funções do ValidateFunctions, ele não
    //consegue entender que .value.length é uma string, apesar de ter o check === "string"
    //no validateFunctions.
    //validação inicial
    if (
      validateInput.minLength != null &&
      typeof validateInput.value === "string"
    )
      //validação com as ValidateFunctions
      // if (
      //   ValidateFunctions.ifString(validateInput) &&
      //   ValidateFunctions.notNull(validateInput)
      // )
      isValid = isValid && validateInput.value.length > validateInput.minLength; // if maxLength is set, then it should have a max length.

    //
    //
    //
    //
    if (
      validateInput.maxLength != null &&
      typeof validateInput.value === "string"
    )
      isValid = isValid && validateInput.value.length < validateInput.maxLength;
    //the following checks if the input is bigger than the min value
    if (validateInput.min != null && typeof validateInput.value === "number")
      isValid = isValid && validateInput.value > validateInput.min;
    //the following checks if the input is smaller than the max value
    if (validateInput.max != null && typeof validateInput.value === "number")
      isValid = isValid && validateInput.value < validateInput.max;
    return isValid;
  }
}
