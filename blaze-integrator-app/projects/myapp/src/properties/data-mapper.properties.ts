export interface ClDataMapperNode {
  id: string;
  icon: string;
  label: string;
  children: ClDataMapperNode[];
  showTransformation: boolean;
  transformationIds?: string[]; // for storing data mapping id
}

export interface ClDataMapping {
  id: string;
  sources: ClDataMapperNode[];
  destination: ClDataMapperNode;
  transformations: ClDataMapperProcessorNode[];
}
export interface ClDataMapperProcessorNode {
  id: string;
  icon?: string;
  label: string;
  name?: string;
  data?: any;
}
