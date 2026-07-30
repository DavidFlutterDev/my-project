import { test, only, enforce, omitWhen, staticSuite } from "vest";
import { SqlProcessorFormModel } from "./sqlprocessor.model";

export const createform_1ValidationSuite = staticSuite(
  (model: SqlProcessorFormModel, field: string) => {
    const urlPattern = /^(?![\w\d+.-]+:\/\/)((\d{1,3}\.){3}\d{1,3}(:\d+)?|([\w-]+\.)*[\w-]+(:\d+)?(\/[\w\d\-._~%!$&'()*+,;=:@]*)?)$/;

    only(field);
    test('driver', 'Driver is required', () => {
      enforce(model.driver).isNotBlank();
    });
    test('address', 'address is required', () => {
      enforce(model.address).isNotBlank();
    });
    test('address', 'Invalid address', () => {
      if (urlPattern.test(model.address ?? '')) {
        return;
      } else {
        return false;
      }
    });
    test('username', 'Username is required', () => {
      enforce(model.username).isNotBlank();
    });
    test('password', 'Password is required', () => {
      enforce(model.password).isNotBlank();
    });
    test('query', 'query is required', () => {
      enforce(model.query).isNotBlank();
    });
    test('hosts', 'Host is required', () => {
      enforce(model.hosts).isNotBlank();
    });
    test('schema', 'Schema is required', () => {
      enforce(model.schema).isNotBlank();
    });
    test('table', 'Table is required', () => {
      enforce(model.table).isNotBlank();
    });
  }
);
