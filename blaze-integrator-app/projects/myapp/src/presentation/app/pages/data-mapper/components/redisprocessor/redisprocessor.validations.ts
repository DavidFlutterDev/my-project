import { test, only, enforce, omitWhen, staticSuite } from "vest";

export const createform_0ValidationSuite = staticSuite(
  (model: any, field: string) => {
    const urlPattern = /^(?![\w\d+.-]+:\/\/)((\d{1,3}\.){3}\d{1,3}(:\d+)?|([\w-]+\.)*[\w-]+(:\d+)?(\/[\w\d\-._~%!$&'()*+,;=:@]*)?)$/;
    
    
      only(field);

    test('url', 'Url is required', () => {
      enforce(model.url).isNotBlank();
    });
    test('url', 'Invalid url', () => {
      if (urlPattern.test(model.url ?? '')) {
        return;
      } else {
        return false;
      }
    });

    test('operation', 'Operation is required', () => {
      enforce(model.operation).isNotBlank();
    });
    test('key', 'Key is required', () => {
      enforce(model.key).isNotBlank();
    });
    test('value', 'Value is required', () => {
      if (model.operation === 'SET') {
        enforce(model.value).isNotBlank();
      } else {
        return;
      }
    });
  },
);
