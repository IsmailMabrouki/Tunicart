/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DetailedSystemStats } from '../../models/detailed-system-stats';

export interface GetSystemStats$Params {
}

export function getSystemStats(http: HttpClient, rootUrl: string, params?: GetSystemStats$Params, context?: HttpContext): Observable<StrictHttpResponse<DetailedSystemStats>> {
  const rb = new RequestBuilder(rootUrl, getSystemStats.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DetailedSystemStats>;
    })
  );
}

getSystemStats.PATH = '/admin/stats';
