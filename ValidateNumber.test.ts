//Validates Number module
import { ValidateNumber } from "./ValidateNumber";

it("Returns true if the number 3 passes the min check (minimum value is 3)", () => {
  const input = {
    value: 3,
    min: 3,
  };
  const result = ValidateNumber.minValueCheck(true, input);
  expect(result).toBe(true);
});

it("Returns true if passing 7 passes the max check (maximum value is 7)", () => {
  const input = {
    value: 7,
    max: 7,
  };
  const result = ValidateNumber.maxValueCheck(true, input);
  expect(result).toBe(true);
});

it("Returns true if passing number 7 passes the min check (minimum value is 3)", () => {
  const input = {
    value: 7,
    min: 3,
  };
  const result = ValidateNumber.minValueCheck(true, input);
  expect(result).toBe(true);
});

it("Returns false if passing the number 8 passes the max check (max value is 7)", () => {
  const input = {
    value: 8,
    max: 7,
  };
  const result = ValidateNumber.maxValueCheck(true, input);
  expect(result).toBe(false);
});
