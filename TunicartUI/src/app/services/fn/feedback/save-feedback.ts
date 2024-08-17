/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Feedback } from '../../models/feedback';
import { FeedbackRequest } from '../../models/feedback-request';

export interface SaveFeedback$Params {
  ItemId: number;
      body: FeedbackRequest
}

export function saveFeedback(http: HttpClient, rootUrl: string, params: SaveFeedback$Params, context?: HttpContext): Observable<StrictHttpResponse<Feedback>> {
  const rb = new RequestBuilder(rootUrl, saveFeedback.PATH, 'post');
  if (params) {
    rb.path('ItemId', params.ItemId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Feedback>;
    })
  );
}

saveFeedback.PATH = '/feedback/{ItemId}';
