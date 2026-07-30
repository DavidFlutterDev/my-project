export interface DataMapperNode {
  type: 'single' | 'group' | 'tree' | 'treeCondition';
  id: string;
  icon?: string;
  label?: string;
  children?: DataMapperNode[];
  parentId?:string;
  width?: number;
  data?: any;
  category?: string;
  isDataValid?: boolean
}

export interface DataMapping {
  id: string;
  sources: DataMapperNode[];
  destination?: DataMapperNode;
  processes?: DataMapperNode[];
}

export interface DataMapperProcessorNode {
  id: string;
  icon?: string;
  label: string;
  type?: 'single' | 'group' | 'tree' | 'treeCondition';
  data?: any;
}
