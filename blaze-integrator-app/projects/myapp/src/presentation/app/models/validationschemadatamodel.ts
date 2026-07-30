import { DeepRequired } from "@clay/ui-components/form-validations";

export type validationSchemaDataModel = Partial<{
  id: number,
  schemaName: string,
  schemaConfig: string,
  status: string,
  tenantCode: string,
  dmlType: string,
  dmlBy: string,
  dmlOn: number
}>;

export const validationschemadatamodelShape: DeepRequired<validationSchemaDataModel> = {
  id: 0,
  schemaName: "",
  schemaConfig: "",
  status: "",
  tenantCode: "",
  dmlType: "",
  dmlBy: "",
  dmlOn: 0
};
