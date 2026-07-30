import { DeepRequired } from "@clay/ui-components/form-validations";

export type TemplatesDataModel = Partial<{
  id: number,
  templatename: string,
  templatestructure: string,
  type: string,
  status: string,
  tenantcode: string,
  dmltype: string,
  dmlby: string,
  dmlon: string
}>;

export const templatesdatamodelShape: DeepRequired<TemplatesDataModel> = {
  id: 0,
  templatename: "",
  templatestructure: "",
  type:"",
  status: "",
  tenantcode: "",
  dmltype: "",
  dmlby: "",
  dmlon: ""
};
