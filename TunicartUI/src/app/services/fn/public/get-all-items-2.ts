/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Item } from '../../models/item';

export interface GetAllItems2$Params {
}

export function getAllItems2(http: HttpClient, rootUrl: string, params?: GetAllItems2$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Item>>> {
  const rb = new RequestBuilder(rootUrl, getAllItems2.PATH, 'get');
  if (params) {
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

getAllItems2.PATH = '/public/items';