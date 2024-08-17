/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FeedbackResponse } from '../../models/feedback-response';

export interface GetFeedbackById$Params {
  id: number;
}

export function getFeedbackById(http: HttpClient, rootUrl: string, params: GetFeedbackById$Params, context?: HttpContext): Observable<StrictHttpResponse<FeedbackResponse>> {
  const rb = new RequestBuilder(rootUrl, getFeedbackById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FeedbackResponse>;
    })
  );
}

getFeedbackById.PATH = '/feedback/{id}';
