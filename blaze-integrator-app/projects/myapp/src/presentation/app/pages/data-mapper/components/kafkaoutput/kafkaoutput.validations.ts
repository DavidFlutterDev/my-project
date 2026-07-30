import { test, only, enforce, omitWhen, staticSuite } from "vest";

export const createform_16ValidationSuite = staticSuite(
  (model: any, field: string) => {
    only(field);

    test('topic', 'Topic is required', () => {
      enforce(model.topic).isNotBlank();
    });

    test('client_id', 'Client id is required', () => {
      enforce(model.client_id).isNotBlank();
    });
  }
);
