import { test, only, enforce, omitWhen, staticSuite } from "vest";

export const createform_55ValidationSuite = staticSuite(
  (model: any, field: string) => {
    only(field);
    test('schema_id', 'Schema is required', () => {
      enforce(model.schema_id).isNotBlank();
    });
  }
);
