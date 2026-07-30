import { DeepRequired } from "@clay/ui-components/form-validations";

export type PipelinesDataModel = Partial<{
  id: number,
  pipelinename: string,
  pipelineconfig: string,
  status: string,
  tenantcode: string,
  dmltype: string,
  dmlby: string,
  dmlon: string,
  templateid: number
}>;

export const pipelinesdatamodelShape: DeepRequired<PipelinesDataModel> = {
  id: 0,
  pipelinename: "",
  pipelineconfig: "",
  status: "",
  tenantcode: "",
  dmltype: "",
  dmlby: "",
  dmlon: "",
  templateid: 0
};
