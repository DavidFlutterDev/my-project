import { test, only, enforce, omitWhen, staticSuite } from "vest";
import { PipelinesDataModel } from "../../models/pipelinesdatamodel";

export const createform_1ValidationSuite = staticSuite(
  (model: PipelinesDataModel, field: string) => {
    // only(field);
    test('pipelinename', 'Pipeline name is required', () => {
      enforce(model.pipelinename).isNotBlank();
    });

    test(
      'pipelinename',
      'Pipeline name  must be between 1 and 100 characters',
      () => {
        const pipelinename = model.pipelinename || '';
        if (pipelinename.length < 1) {
          enforce(false).equals(
            true,
            'Pipeline name must be at least 1 characters long.',
          );
        } else if (pipelinename.length > 100) {
          enforce(false).equals(
            true,
            'Pipeline name must be at most 100 characters long.',
          );
        }
      },
    );
    test('templateid', 'Pipeline template is required', () => {
      enforce(model.templateid).isNotBlank();
    });
  }
);
