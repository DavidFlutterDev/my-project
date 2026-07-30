import { test, only, enforce, omitWhen, staticSuite } from "vest";

export const createform_1ValidationSuite = staticSuite(
  (model: any, field: string) => {
    only(field);
    test('bucket', 'Bucket is required', () => {
      enforce(model.bucket).isNotBlank();
    });
    test('prefix', 'Prefix is required', () => {
      enforce(model.prefix).isNotBlank();
    });
    test('path', 'Path is required', () => {
      enforce(model.path).isNotBlank();
    });
    test('region', 'Region is required', () => {
      enforce(model.region).isNotBlank();
    });

  }
);
