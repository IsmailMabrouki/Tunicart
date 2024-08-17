/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApiResponse } from '../../models/api-response';

export interface UploadItemImage$Params {
  ItemId: number;
      body?: {
'imageFile': Blob;
}
}

export function uploadItemImage(http: HttpClient, rootUrl: string, params: UploadItemImage$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponse>> {
  const rb = new RequestBuilder(rootUrl, uploadItemImage.PATH, 'post');
  if (params) {
    rb.path('ItemId', params.ItemId, {});
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

uploadItemImage.PATH = '/image/item/upload/{ItemId}';
