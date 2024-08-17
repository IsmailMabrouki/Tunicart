/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApiResponse } from '../../models/api-response';

export interface UploadImage$Params {
  idUser: number;
      body?: {
'imageFile': Blob;
}
}

export function uploadImage(http: HttpClient, rootUrl: string, params: UploadImage$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponse>> {
  const rb = new RequestBuilder(rootUrl, uploadImage.PATH, 'post');
  if (params) {
    rb.path('idUser', params.idUser, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ApiResponse>;
    })
  );
}

uploadImage.PATH = '/image/user/upload/{idUser}';
