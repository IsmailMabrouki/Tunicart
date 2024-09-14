/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ActivityHistory } from '../../models/activity-history';

export interface GetActivityHistoryByUserId$Params {
  userId: number;
}

export function getActivityHistoryByUserId(http: HttpClient, rootUrl: string, params: GetActivityHistoryByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ActivityHistory>>> {
  const rb = new RequestBuilder(rootUrl, getActivityHistoryByUserId.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ActivityHistory>>;
    })
  );
}

getActivityHistoryByUserId.PATH = '/user/activities/{userId}';
