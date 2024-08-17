/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Item } from '../../models/item';

export interface GetItemById2$Params {
  id: number;
}

export function getItemById2(http: HttpClient, rootUrl: string, params: GetItemById2$Params, context?: HttpContext): Observable<StrictHttpResponse<Item>> {
  const rb = new RequestBuilder(rootUrl, getItemById2.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Item>;
    })
  );
}

getItemById2.PATH = '/public/items/{id}';
