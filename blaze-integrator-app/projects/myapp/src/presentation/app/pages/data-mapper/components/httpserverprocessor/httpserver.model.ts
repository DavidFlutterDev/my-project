export interface HttpServerData {
  // address: string,
  path: string,
  allowed_verbs: string[],
  timeout: string,
  rate_limit: string,
  cors: CorsModel,
  sync_response: SyncResponseModel
}

export interface CorsModel {
  enabled: boolean,
  allowed_origins: string[]
}
export interface SyncResponseModel {
  // status: string,
  headers: object,
  metadata_headers: {
    include_prefixes: string[],
    include_patterns: string[]
  }
}

















