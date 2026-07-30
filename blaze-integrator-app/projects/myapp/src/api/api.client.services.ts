import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { ApiVariables } from '../presentation/app/utils/api.variables';

export enum RequestType {
  get = 'get',
  put = 'put',
  post = 'post',
}


@Injectable({ providedIn: 'root' })
export class ApiClient {
  token: any;
  headers: any;
  httpHeader: any;
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    console.log('error', error.error);
    console.log('error', JSON.stringify(error));
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => errorMessage);
  }

  getListapi(url:any , params?: any): Observable<any> {
    if (params) {
      return this.http
        .get<any>(`${ApiVariables.server_url}${url}?${params}`)
        .pipe(catchError(this.handleError));
    } else {
      return this.http
        .get<any>(`${ApiVariables.server_url}${url}`)
        .pipe(catchError(this.handleError));
    }
  }
  getDetailsApi(url:any , id?: any): Observable<any> {
    if(id){
      return this.http
      .get<any>(`${ApiVariables.server_url}${url}/${id}`)
      .pipe(catchError(this.handleError));
    }
    return this.http
      .get<any>(`${ApiVariables.server_url}${url}`)
      .pipe(catchError(this.handleError));
  }

  deleteDataApi(url:any , id: any): Observable<any> {
    return this.http
      .delete<any>(`${ApiVariables.server_url}${url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  saveDataApi(url:any , body: any, id?: any): Observable<any> {
    if (id == null) {
      return this.http
        .post<any>(`${ApiVariables.server_url}${url}`, body)
        .pipe(catchError(this.handleError));
    }else{
      return this.http
        .put<any>(`${ApiVariables.server_url}${url}`, body)
        .pipe(catchError(this.handleError));
    }
  }


  // getValidationSchemasList(params?: any): Observable<any> {
  //   if (params) {
  //     return this.http
  //       .get<any>(`${SERVER_URL}${VALIDATION_SCHEMA_URL}?${params}`)
  //       .pipe(catchError(this.handleError));
  //   } else {
  //     return this.http
  //       .get<any>(`${SERVER_URL}${VALIDATION_SCHEMA_URL}`)
  //       .pipe(catchError(this.handleError));
  //   }
  // }
  // getValidatinSchemasDetails(id?: any): Observable<any> {
  //   return this.http
  //     .get<any>(`${SERVER_URL}${VALIDATION_SCHEMA_URL}/${id}`)
  //     .pipe(catchError(this.handleError));
  // }

  // deleteValidationSchemas(id: any): Observable<any> {
  //   return this.http
  //     .delete<any>(`${SERVER_URL}${VALIDATION_SCHEMA_URL}/${id}`)
  //     .pipe(catchError(this.handleError));
  // }

  // saveValidationSchema(body: any, id?: any): Observable<any> {
  //   if (id == null) {
  //     return this.http
  //       .post<any>(`${SERVER_URL}${VALIDATION_SCHEMA_URL}`, body)
  //       .pipe(catchError(this.handleError));
  //   }else{
  //     return this.http
  //       .put<any>(`${SERVER_URL}${VALIDATION_SCHEMA_URL}`, body)
  //       .pipe(catchError(this.handleError));
  //   }
  // }


  // getPipelineList(params?: any): Observable<any> {
  //   if (params) {
  //     return this.http
  //       .get<any>(`${SERVER_URL}${PIPELINE_URL}?${params}`)
  //       .pipe(catchError(this.handleError));
  //   } else {
  //     return this.http
  //       .get<any>(`${SERVER_URL}${PIPELINE_URL}`)
  //       .pipe(catchError(this.handleError));
  //   }
  // }
  // getPipelineDetails(id?: any): Observable<any> {
  //   return this.http
  //     .get<any>(`${SERVER_URL}${PIPELINE_URL}/${id}`)
  //     .pipe(catchError(this.handleError));
  // }

  // deletePipeline(id: any): Observable<any> {
  //   return this.http
  //     .delete<any>(`${SERVER_URL}${PIPELINE_URL}/${id}`)
  //     .pipe(catchError(this.handleError));
  // }

  // savePipeline(body: any, id?: any): Observable<any> {
  //   if (id == null) {
  //     return this.http
  //       .post<any>(`${SERVER_URL}${PIPELINE_URL}`, body)
  //       .pipe(catchError(this.handleError));
  //   }else{
  //     return this.http
  //       .put<any>(`${SERVER_URL}${PIPELINE_URL}`, body)
  //       .pipe(catchError(this.handleError));
  //   }
  // }
}
