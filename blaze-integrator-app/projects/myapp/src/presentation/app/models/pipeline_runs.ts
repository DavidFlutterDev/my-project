import { DeepRequired } from "@clay/ui-components/form-validations";

export type Pipeline_runs = Partial<{
  pipeline_runs_id: number,
  pipelines_id: number,
  trigger_status: string,
  trigger_status_updated_on: string,
  execution_status: string,
  execution_status_updated_on: string,
  tenant_code: string,
  dml_type: string,
  dml_by: string,
  dml_on: string
}>;

export const pipelineRunsShape: DeepRequired<Pipeline_runs> = {
  pipeline_runs_id: 0,
  pipelines_id: 0,
  trigger_status: "",
  trigger_status_updated_on: "",
  execution_status: "",
  execution_status_updated_on: "",
  tenant_code: "",
  dml_type: "",
  dml_by: "",
  dml_on: ""
};
