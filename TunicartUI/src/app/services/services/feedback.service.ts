/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteFeedback } from '../fn/feedback/delete-feedback';
import { DeleteFeedback$Params } from '../fn/feedback/delete-feedback';
import { Feedback } from '../models/feedback';
import { FeedbackResponse } from '../models/feedback-response';
import { getAllFeedback } from '../fn/feedback/get-all-feedback';
import { GetAllFeedback$Params } from '../fn/feedback/get-all-feedback';
import { getFeedbackById } from '../fn/feedback/get-feedback-by-id';
import { GetFeedbackById$Params } from '../fn/feedback/get-feedback-by-id';
import { saveFeedback } from '../fn/feedback/save-feedback';
import { SaveFeedback$Params } from '../fn/feedback/save-feedback';

@Injectable({ providedIn: 'root' })
export class FeedbackService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveFeedback()` */
  static readonly SaveFeedbackPath = '/feedback/{ItemId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveFeedback()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFeedback$Response(params: SaveFeedback$Params, context?: HttpContext): Observable<StrictHttpResponse<Feedback>> {
    return saveFeedback(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveFeedback$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFeedback(params: SaveFeedback$Params, context?: HttpContext): Observable<Feedback> {
    return this.saveFeedback$Response(params, context).pipe(
      map((r: StrictHttpResponse<Feedback>): Feedback => r.body)
    );
  }

  /** Path part for operation `getAllFeedback()` */
  static readonly GetAllFeedbackPath = '/feedback';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllFeedback()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFeedback$Response(params?: GetAllFeedback$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FeedbackResponse>>> {
    return getAllFeedback(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllFeedback$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFeedback(params?: GetAllFeedback$Params, context?: HttpContext): Observable<Array<FeedbackResponse>> {
    return this.getAllFeedback$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FeedbackResponse>>): Array<FeedbackResponse> => r.body)
    );
  }

  /** Path part for operation `getFeedbackById()` */
  static readonly GetFeedbackByIdPath = '/feedback/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFeedbackById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFeedbackById$Response(params: GetFeedbackById$Params, context?: HttpContext): Observable<StrictHttpResponse<FeedbackResponse>> {
    return getFeedbackById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFeedbackById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFeedbackById(params: GetFeedbackById$Params, context?: HttpContext): Observable<FeedbackResponse> {
    return this.getFeedbackById$Response(params, context).pipe(
      map((r: StrictHttpResponse<FeedbackResponse>): FeedbackResponse => r.body)
    );
  }

  /** Path part for operation `deleteFeedback()` */
  static readonly DeleteFeedbackPath = '/feedback/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFeedback()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFeedback$Response(params: DeleteFeedback$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteFeedback(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteFeedback$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFeedback(params: DeleteFeedback$Params, context?: HttpContext): Observable<void> {
    return this.deleteFeedback$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
