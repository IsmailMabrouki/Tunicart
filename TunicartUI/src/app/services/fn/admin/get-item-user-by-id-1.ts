/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Item } from '../../models/item';

export interface GetItemUserById1$Params {
  UserId: number;
}

export function getItemUserById1(http: HttpClient, rootUrl: string, params: GetItemUserById1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Item>>> {
  const rb = new RequestBuilder(rootUrl, getItemUserById1.PATH, 'get');
  if (params) {
    rb.path('UserId', params.UserId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Item>>;
    })
  );
}

getItemUserById1.PATH = '/admin/items/{UserId}';
