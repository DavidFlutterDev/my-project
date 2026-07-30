import { test, only, enforce, omitWhen, staticSuite } from 'vest';

export const createform_8ValidationSuite = staticSuite(
  (model: any, field: string) => {
    // const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)*[\w\d-]+(\:\d+)?(\/[\w\d.-]*)*\/?$/;
    const urlPattern = /^(?![\w\d+.-]+:\/\/)((\d{1,3}\.){3}\d{1,3}(:\d+)?|([\w-]+\.)*[\w-]+(:\d+)?(\/[\w\d\-._~%!$&'()*+,;=:@]*)?)$/;

    only(field);
    test('url', 'Url is required', () => {
      enforce(model.url).isNotBlank();
    });

    test('url', 'Invalid url', () => {
      if (urlPattern.test(model.url)) {
        return;
      } else {
        return false;
      }
    });

    test('verb', 'Verb is required', () => {
      enforce(model.verb).isNotBlank();
    });
  },
);
