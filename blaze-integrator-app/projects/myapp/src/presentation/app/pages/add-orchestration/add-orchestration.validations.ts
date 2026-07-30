import { test, only, enforce, omitWhen, staticSuite } from 'vest';
import { AddorchestrationService } from './add-orchestration.service';

export const createform_21ValidationSuite = staticSuite(
  (
    model: any,
    field: string,
    addorchestrationService: AddorchestrationService,
  ) => {
    only(field);
    test('orchestration_name', 'orchestration name is required', () => {
      enforce(model.orchestration_name).isNotBlank();
    });

    test('noOfInstance', 'No. of instances is required', () => {
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

    test(
      'orchestration_name',
      'orchestration name  must be between 1 and 100 characters',
      () => {
        const orchestration_name = model.orchestration_name || '';
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
    test('Orchestration_template', 'Orchestration template is required', () => {
      enforce(model.Orchestration_template).isNotBlank();
    });
  },
);
