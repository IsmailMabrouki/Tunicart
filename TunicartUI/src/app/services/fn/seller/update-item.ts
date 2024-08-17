/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ItemRequest } from '../../models/item-request';
import { UpdateResponse } from '../../models/update-response';

export interface UpdateItem$Params {
  ItemId: number;
      body: ItemRequest
}

export function updateItem(http: HttpClient, rootUrl: string, params: UpdateItem$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdateResponse>> {
  const rb = new RequestBuilder(rootUrl, updateItem.PATH, 'put');
  if (params) {
    rb.path('ItemId', params.ItemId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UpdateResponse>;
    })
  );
}

updateItem.PATH = '/seller/items/{ItemId}';
