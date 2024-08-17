/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Item } from '../../models/item';

export interface SearchItems1$Params {
  query: string;
}

export function searchItems1(http: HttpClient, rootUrl: string, params: SearchItems1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Item>>> {
  const rb = new RequestBuilder(rootUrl, searchItems1.PATH, 'get');
  if (params) {
    rb.query('query', params.query, {});
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

searchItems1.PATH = '/items/search';
