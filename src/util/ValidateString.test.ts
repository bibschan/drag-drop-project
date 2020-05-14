import { ValidateString } from "./ValidateString";
import { ValidateNumber } from "./ValidateNumber";

describe("ValidateString", function () {
  //Validates String module
  it("Check if required is true and returns true", () => {
    const input = {
      value: "Object",
      required: true,
    };
    const result = ValidateString.requiredCheck(true, input);
    expect(result).toBe(true);
  });

  it("Check if object is not required and returns false", () => {
    const input = {
      value: "Object",
      required: false,
    };
    const result = ValidateString.requiredCheck(true, input);
    expect(result).toBe(false);
  });
  it("Check if value (7 char) passes min length of 5", () => {
    const input = {
      value: "This is",
      required: true,
      minLength: 5,
    };
    const result = ValidateString.minLengthCheck(true, input);
    expect(result).toBe(true);
  });

  it("Check if value (2 char) is outside min length of 5", () => {
    const input = {
      value: "Th",
      required: true,
      minLength: 5,
    };
    const result = ValidateString.minLengthCheck(true, input);
    expect(result).toBe(false);
  });
  it("Check if value (7 char) is within max length", () => {
    const input = {
      value: "This is",
      required: true,
      maxLength: 10,
    };
    const result = ValidateString.maxLengthCheck(true, input);
    expect(result).toBe(true);
  });

  it("Check if value (16 char) is outside max length", () => {
    const input = {
      value: "This is a string",
      required: true,
      maxLength: 10,
    };
    const result = ValidateString.maxLengthCheck(true, input);
    expect(result).toBe(false);
  });

  //Validates Number module
  it("Check if number of people assigned passes the min check", () => {
    const input = {
      value: 3,
      min: 3,
    };
    const result = ValidateNumber.minValueCheck(true, input);
    expect(result).toBe(true);
  });

  it("Check if number of people assigned passes the max check", () => {
    const input = {
      value: 7,
      max: 7,
    };
    const result = ValidateNumber.maxValueCheck(true, input);
    expect(result).toBe(true);
  });

  it("Check if number of people assigned passes the min check", () => {
    const input = {
      value: 7,
      min: 3,
    };
    const result = ValidateNumber.minValueCheck(true, input);
    expect(result).toBe(true);
  });
  it("Check if number of people assigned passes the max check", () => {
    const input = {
      value: 8,
      max: 7,
    };
    const result = ValidateNumber.maxValueCheck(true, input);
    expect(result).toBe(false);
  });
});
