import { test, only, enforce, omitWhen, staticSuite } from 'vest';

export const createform_26ValidationSuite = staticSuite(
  (model: any, field: string) => {
    only(field);
    console.log('model', model);
    test('input3', 'orchestration name is required', () => {
      enforce(model.input3).isNotBlank();
    });

    test(
      'input3',
      'orchestration name  must be between 1 and 100 characters',
      () => {
        const orchestration_name = model.input3 || '';
        if (orchestration_name.length < 1) {
          enforce(false).equals(
            true,
            'orchestration name must be at least 1 characters long.',
          );
        } else if (orchestration_name.length > 100) {
          enforce(false).equals(
            true,
            'orchestration name must be at most 100 characters long.',
          );
        }
      },
    );
    test('select1', 'Orchestration template is required', () => {
      enforce(model.select1).isNotBlank();
    });
    test('noOfInstance', 'No. of instance is required', () => {
      enforce(model.noOfInstance).isNotBlank();
    });
    test('noOfInstance', 'Must be greater than 0', () => {
      if (model.noOfInstance) {
        enforce(Number(model.noOfInstance)).greaterThan(0);
      }
    });
    test('product_code', 'Product code is required', () => {
      enforce(model.product_code).isNotBlank();
    });
    test('process_code', 'Process code is required', () => {
      enforce(model.process_code).isNotBlank();
    });
  },
);
