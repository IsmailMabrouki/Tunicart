/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { confirmPaymentIntent } from '../fn/payment/confirm-payment-intent';
import { ConfirmPaymentIntent$Params } from '../fn/payment/confirm-payment-intent';
import { createPaymentIntent } from '../fn/payment/create-payment-intent';
import { CreatePaymentIntent$Params } from '../fn/payment/create-payment-intent';

@Injectable({ providedIn: 'root' })
export class PaymentService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createPaymentIntent()` */
  static readonly CreatePaymentIntentPath = '/payment/create-payment-intent';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPaymentIntent()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPaymentIntent$Response(params: CreatePaymentIntent$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: {
};
}>> {
    return createPaymentIntent(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createPaymentIntent$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPaymentIntent(params: CreatePaymentIntent$Params, context?: HttpContext): Observable<{
[key: string]: {
};
}> {
    return this.createPaymentIntent$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: {
};
}>): {
[key: string]: {
};
} => r.body)
    );
  }

  /** Path part for operation `confirmPaymentIntent()` */
  static readonly ConfirmPaymentIntentPath = '/payment/confirm-payment-intent';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `confirmPaymentIntent()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  confirmPaymentIntent$Response(params: ConfirmPaymentIntent$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: {
};
}>> {
    return confirmPaymentIntent(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `confirmPaymentIntent$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  confirmPaymentIntent(params: ConfirmPaymentIntent$Params, context?: HttpContext): Observable<{
[key: string]: {
};
}> {
    return this.confirmPaymentIntent$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: {
};
}>): {
[key: string]: {
};
} => r.body)
    );
  }

}
