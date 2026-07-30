import { test, only, enforce, omitWhen, staticSuite } from "vest";

export const createform_31ValidationSuite = staticSuite(
  (model: any, field: string) => {
    only(field);

    test('address', 'Address is required', () => {
      enforce(model.address).isNotBlank();
    });

    test('path', 'Path is required', () => {
      enforce(model.path).isNotBlank();
    });
    test('codec', 'codec is required', () => {
      enforce(model.codec).isNotBlank();
    });
  }
);

export const createform_32ValidationSuite = staticSuite(
  (model: any, field: string) => {
    only(field);
    test('userName', 'UserName is required', () => {
      enforce(model.userName).isNotBlank();
    });
    test('password', 'Password is required', () => {
      enforce(model.password).isNotBlank();
    });
  }
);
