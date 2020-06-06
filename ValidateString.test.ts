import { ValidateString } from "./ValidateString";

describe("ValidateString", function () {
  //Validates String module
  it("Returns true if required", () => {
    const input = {
      value: "Object",
      required: true,
    };
    const result = ValidateString.requiredCheck(true, input);
    expect(result).toBe(true);
  });

  it("Returns false if the object is not required", () => {
    const input = {
      value: "Object",
      required: false,
    };
    const result = ValidateString.requiredCheck(true, input);
    expect(result).toBe(false);
  });

  it("Returns true if passing a value of 7 char has a minimum length of 5", () => {
    const input = {
      value: "This is",
      required: true,
      minLength: 5,
    };
    const result = ValidateString.minLengthCheck(true, input);
    expect(result).toBe(true);
  });

  it("Returns true if passing a value of 2 char (is outside min length of 5)", () => {
    const input = {
      value: "Th",
      required: true,
      minLength: 5,
    };
    const result = ValidateString.minLengthCheck(true, input);
    expect(result).toBe(false);
  });
  it("Returns true if passing a value of 7 char (is within max length of 10)", () => {
    const input = {
      value: "This is",
      required: true,
      maxLength: 10,
    };
    const result = ValidateString.maxLengthCheck(true, input);
    expect(result).toBe(true);
  });

  it("Returns false if a value of 16 char is passed (is outside max length of 10)", () => {
    const input = {
      value: "This is a string",
      required: true,
      maxLength: 10,
    };
    const result = ValidateString.maxLengthCheck(true, input);
    expect(result).toBe(false);
  });
});
