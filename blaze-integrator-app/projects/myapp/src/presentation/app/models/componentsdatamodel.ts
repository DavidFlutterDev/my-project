import { DeepRequired } from "@clay/ui-components/form-validations";

export type ComponentsDataModel = Partial<{
  id: number,
  componentname: string,
  componentdescription: string,
  componenttype: string,
  status: string,
  tenantcode: string,
  dmltype: string,
  dmlby: string
}>;

export const componentsdatamodelShape: DeepRequired<ComponentsDataModel> = {
  id: 0,
  componentname: "",
  componentdescription: "",
  componenttype: "",
  status: "",
  tenantcode: "",
  dmltype: "",
  dmlby: ""
};
