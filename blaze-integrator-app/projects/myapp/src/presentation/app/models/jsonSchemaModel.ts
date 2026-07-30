import { ClDynamicTreeViewProperties } from "@clay/ui-components/containers";
import { DeepRequired } from "@clay/ui-components/form-validations";
import { ClComponentTypes } from "@clay/ui-components/shared";

export type JsonSchemaDataModel = Partial<{
  jsonSchemaName: string,
  treeView : ClDynamicTreeViewProperties
}>;

export const jsonSchemadatamodelShape: DeepRequired<JsonSchemaDataModel> = {
  jsonSchemaName: "",
  treeView: {
    id: "",
    type: ClComponentTypes.chip
  },
};
