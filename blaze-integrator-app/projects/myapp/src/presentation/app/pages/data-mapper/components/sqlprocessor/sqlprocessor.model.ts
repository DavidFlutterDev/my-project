import { DeepRequired } from "@clay/ui-components/form-validations";

export type SqlProcessorFormModel = Partial<{
  driver: string,
  address:string,
  username: string,
  password: string,
  query:string,
  table: string,
  schema: string,
  hosts: string,
  columns: string[],
  args_mapping: string[],
  columns_field_mapping: ColumnMapping[],
  where: Condition[],
}>

export type Condition = Partial<{
  col: string,
  operator: string,
  value: string
}>

export type ColumnMapping = Partial<{
  column: string,
  value: string
}>

export const sqlProcessorFormShape: DeepRequired<SqlProcessorFormModel> = {
  driver: '',
  address:'',
  username: '',
  password: '',
  query: '',
  table: '',
  schema: '',
  hosts: '',
  columns: [],
  args_mapping: [],
  columns_field_mapping: [],
  where:[{
    col: '',
    operator: '',
    value: ''
  }]
};
