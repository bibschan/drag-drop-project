import { Validatable } from "Validatable";

export module ValidateFunctions {
  export function ifString(validateInput: Validatable.Validatable): boolean {
    if (typeof validateInput.value === "string") return true;
    return false;
  }

  export function notNull(validateInput: Validatable.Validatable): boolean {
    if (validateInput.minLength != null) return true;
    return false;
  }
}
