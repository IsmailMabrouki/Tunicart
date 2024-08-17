/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Item } from '../../models/item';
import { ItemRequest } from '../../models/item-request';

export interface CreateItem1$Params {
      body: ItemRequest
}

export function createItem1(http: HttpClient, rootUrl: string, params: CreateItem1$Params, context?: HttpContext): Observable<StrictHttpResponse<Item>> {
  const rb = new RequestBuilder(rootUrl, createItem1.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

createItem1.PATH = '/items';
