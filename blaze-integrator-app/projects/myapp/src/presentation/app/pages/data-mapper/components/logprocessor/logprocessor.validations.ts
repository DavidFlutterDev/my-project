import { test, only, enforce, omitWhen, staticSuite } from "vest";

export const createform_54ValidationSuite = staticSuite(
  (model: any, field: string) => {
    only(field);
    test('level', 'Level is required', () => {
      enforce(model.level).isNotBlank();
    });
    test('message', 'Message is required', () => {
      enforce(model.message).isNotBlank();
    });
  }
);
