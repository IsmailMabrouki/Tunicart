/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Item } from '../../models/item';

export interface GetItemUserById$Params {
  UserId: number;
}

export function getItemUserById(http: HttpClient, rootUrl: string, params: GetItemUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Item>>> {
  const rb = new RequestBuilder(rootUrl, getItemUserById.PATH, 'get');
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

getItemUserById.PATH = '/seller/items/{UserId}';
