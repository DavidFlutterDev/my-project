import { test, only, enforce, omitWhen, staticSuite } from 'vest';
import { JsonSchemaDataModel } from '../../models/jsonSchemaModel';
import { DeepRequired } from '@clay/ui-components/form-validations';

export const createform_41ValidationSuite = staticSuite(
  (model: JsonSchemaDataModel, field: string) => {
    console.log('field: ', field),
      test('jsonSchemaName', 'Json schema name is required', () => {
        enforce(model.jsonSchemaName).isNotBlank();
      });

    test(
      'jsonSchemaName',
      'Json schema  name  must be between 1 and 100 characters',
      () => {
        const jsonSchemaName = model.jsonSchemaName || '';
        if (jsonSchemaName.length < 1) {
          enforce(false).equals(
            true,
            'Json schema  name must be at least 1 characters long.',
          );
        } else if (jsonSchemaName.length > 100) {
          enforce(false).equals(
            true,
            'Json schema name must be at most 100 characters long.',
          );
        }
      },
    );
  },
);

export interface TreeNode {
  id: string;
  fieldName: string;
  fieldType: string;
  required: string;
  pattern?: string;
  minLength?: string;
  maxLength?: string;
  minimum?: string;
  exclusiveMinimum?: string;
  maximum?: string;
  exclusiveMaximum?: string;
  itemType?: string;
  nodes?: TreeNode[]; // Recursive definition for child nodes
}

export type TreeFormModel = TreeNode;

export const treeFormShape: DeepRequired<TreeFormModel> = {
  id: '',
  fieldName: '',
  fieldType: '',
  required: 'Yes',
  pattern: '',
  minLength: '',
  maxLength: '',
  minimum: '',
  exclusiveMinimum: '',
  maximum: '',
  exclusiveMaximum: '',
  itemType: '',
  nodes: [], // Initialize as an empty array
};

export const createTreeValidationSuite = staticSuite(
  (model: any, field?: string, id?: string) => {
    console.log('111', model, field, id);
    const validateNode = (node: any) => {
      if (node.hasOwnProperty(id)) {
        console.log('node', node);
        //  validation for Field name texct field
        if (field!.includes('fieldName')) {
          test('fieldName', 'Field Name is required', () => {
            enforce(node.fieldName).isNotEmpty();
          });
        }

        //  validation for Field type dropdown
        if (field!.includes('fieldType')) {
          test('fieldType', 'Field Type is required', () => {
            enforce(node.fieldType).isNotEmpty();
          });
        }

        //  validation for Is required radio button
        if (field!.includes('required')) {
          test('required', 'This is required', () => {
            enforce(node.required).isNotEmpty();
          });
        }

        //  validation for item type dropdown
        if (field!.includes('itemType')) {
          test('itemType', 'Item Type is required', () => {
            enforce(node.itemType).isNotEmpty();
          });
        }

        //  validation for Min length text field
        if (field!.includes('minLength')) {
          test('minLength', '', () => {
            // Skip validation if the field is not provided
            if (node.minLength === undefined || node.minLength === '') {
              return; // No error is set; validation passes for empty values
            }
          });

          test('minLength', 'Must be a valid number', () => {
            if (node.minLength) {
              console.log(
                '212 enforce(node.minLength).isNumeric()',
                enforce(node.minLength).isNumeric(),
              );
              enforce(node.minLength).isNumeric();
            } else {
              console.log('212 else');
            }
          });

          test('minLength', 'Must be greater than 0', () => {
            if (node.minLength) {
              enforce(Number(node.minLength)).greaterThan(0);
            }
          });
        }

        //  validation for Minimum text field
        if (field!.includes('minimum')) {
          test('minimum', '', () => {
            // Skip validation if the field is not provided
            if (node.minimum === undefined || node.minimum === '') {
              return; // No error is set; validation passes for empty values
            }
          });

          test('minimum', 'Must be a valid number', () => {
            if (node.minimum) {
              enforce(node.minimum).isNumeric();
            } else {
              console.log('212 else');
            }
          });

          if (
            node['maximum'] != undefined &&
            node['maximum'] != '' &&
            node['minimum'] != undefined &&
            node['minimum'] != ''
          ) {
            test('minimum', 'Must be less than maximum', () => {
              // return Number(node.maximum) >= Number(node.minimum);
              if (Number(node.minimum) <= Number(node.maximum)) {
                return;
              } else {
                return false;
              }
            });
          }
        }

        //  validation for maximum text field
        if (field!.includes('maximum')) {
          test('maximum', '', () => {
            // Skip validation if the field is not provided
            if (node.maximum === undefined || node.maximum === '') {
              return; // No error is set; validation passes for empty values
            }
          });

          test('maximum', 'Must be a valid number', () => {
            if (node.maximum) {
              enforce(node.maximum).isNumeric();
            } else {
              console.log('212 else');
            }
          });
          if (
            node['maximum'] != undefined &&
            node['maximum'] != '' &&
            node['minimum'] != undefined &&
            node['minimum'] != ''
          ) {
            test('maximum', 'Must be greater than minimum', () => {
              // return Number(node.maximum) >= Number(node.minimum);
              if (Number(node.maximum) >= Number(node.minimum)) {
                return;
              } else {
                return false;
              }
            });
          }
        }

        // if (field!.includes('maximum') || field!.includes('minimum')) {
        //   if (
        //     node['maximum'] != undefined &&
        //     node['maximum'] != '' &&
        //     node['minimum'] != undefined &&
        //     node['minimum'] != ''
        //   ) {

        //     test('maximum', 'Must be greater than minimum', () => {
        //       // return Number(node.maximum) >= Number(node.minimum);
        //       if (Number(node.maximum) >= Number(node.minimum)) {
        //         return;
        //       } else {
        //         return false;
        //       }
        //     });
        //   } else {
        //     console.log('out');
        //   }
        // }
      }

      if (node.nodes != undefined && node.nodes.length) {
        node.nodes.forEach((childnode: any) => {
          validateNode(childnode);
        });
      }
    };

    if (model.nodes != undefined && model.nodes.length) {
      model.nodes.forEach((child: any) => {
        validateNode(child);
      });
    }
  },
);
