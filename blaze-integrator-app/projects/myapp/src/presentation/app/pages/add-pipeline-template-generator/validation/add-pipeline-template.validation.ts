
import { create, enforce, omitWhen, only, test } from 'vest';
import {TemplatesDataModel} from '../../../models/templatesdatamodel';


export const  AddTemplateFormValidation = create(
  (model: TemplatesDataModel, field: string) => {
    test('name', 'Pipeline template name is required', () => {
      enforce(model.templatename).isNotBlank();
    });
  }
);
