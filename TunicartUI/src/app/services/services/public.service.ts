/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllItems2 } from '../fn/public/get-all-items-2';
import { GetAllItems2$Params } from '../fn/public/get-all-items-2';
import { getAllSellers } from '../fn/public/get-all-sellers';
import { GetAllSellers$Params } from '../fn/public/get-all-sellers';
import { getItemById2 } from '../fn/public/get-item-by-id-2';
import { GetItemById2$Params } from '../fn/public/get-item-by-id-2';
import { Item } from '../models/item';
import { searchItems1 } from '../fn/public/search-items-1';
import { SearchItems1$Params } from '../fn/public/search-items-1';

@Injectable({ providedIn: 'root' })
export class PublicService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllSellers()` */
  static readonly GetAllSellersPath = '/public/sellers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllSellers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSellers$Response(params?: GetAllSellers$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getAllSellers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllSellers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSellers(params?: GetAllSellers$Params, context?: HttpContext): Observable<{
}> {
    return this.getAllSellers$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllItems2()` */
  static readonly GetAllItems2Path = '/public/items';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllItems2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllItems2$Response(params?: GetAllItems2$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Item>>> {
    return getAllItems2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllItems2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllItems2(params?: GetAllItems2$Params, context?: HttpContext): Observable<Array<Item>> {
    return this.getAllItems2$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Item>>): Array<Item> => r.body)
    );
  }

  /** Path part for operation `getItemById2()` */
  static readonly GetItemById2Path = '/public/items/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemById2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemById2$Response(params: GetItemById2$Params, context?: HttpContext): Observable<StrictHttpResponse<Item>> {
    return getItemById2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getItemById2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemById2(params: GetItemById2$Params, context?: HttpContext): Observable<Item> {
    return this.getItemById2$Response(params, context).pipe(
      map((r: StrictHttpResponse<Item>): Item => r.body)
    );
  }

  /** Path part for operation `searchItems1()` */
  static readonly SearchItems1Path = '/public/items/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchItems1()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchItems1$Response(params: SearchItems1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Item>>> {
    return searchItems1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchItems1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchItems1(params: SearchItems1$Params, context?: HttpContext): Observable<Array<Item>> {
    return this.searchItems1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Item>>): Array<Item> => r.body)
    );
  }

}
