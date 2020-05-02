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
