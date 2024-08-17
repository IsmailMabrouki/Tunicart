/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createItem } from '../fn/seller/create-item';
import { CreateItem$Params } from '../fn/seller/create-item';
import { deleteItem } from '../fn/seller/delete-item';
import { DeleteItem$Params } from '../fn/seller/delete-item';
import { deleteOrder } from '../fn/seller/delete-order';
import { DeleteOrder$Params } from '../fn/seller/delete-order';
import { getAllItems1 } from '../fn/seller/get-all-items-1';
import { GetAllItems1$Params } from '../fn/seller/get-all-items-1';
import { getAllOrders } from '../fn/seller/get-all-orders';
import { GetAllOrders$Params } from '../fn/seller/get-all-orders';
import { getItemById1 } from '../fn/seller/get-item-by-id-1';
import { GetItemById1$Params } from '../fn/seller/get-item-by-id-1';
import { getItemUserById } from '../fn/seller/get-item-user-by-id';
import { GetItemUserById$Params } from '../fn/seller/get-item-user-by-id';
import { getOrderById1 } from '../fn/seller/get-order-by-id-1';
import { GetOrderById1$Params } from '../fn/seller/get-order-by-id-1';
import { Item } from '../models/item';
import { updateItem } from '../fn/seller/update-item';
import { UpdateItem$Params } from '../fn/seller/update-item';
import { updateOrder } from '../fn/seller/update-order';
import { UpdateOrder$Params } from '../fn/seller/update-order';
import { UpdateResponse } from '../models/update-response';

@Injectable({ providedIn: 'root' })
export class SellerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getOrderById1()` */
  static readonly GetOrderById1Path = '/seller/orders/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrderById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderById1$Response(params: GetOrderById1$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getOrderById1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrderById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderById1(params: GetOrderById1$Params, context?: HttpContext): Observable<{
}> {
    return this.getOrderById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `updateOrder()` */
  static readonly UpdateOrderPath = '/seller/orders/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateOrder()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOrder$Response(params: UpdateOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateOrder$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOrder(params: UpdateOrder$Params, context?: HttpContext): Observable<{
}> {
    return this.updateOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `deleteOrder()` */
  static readonly DeleteOrderPath = '/seller/orders/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOrder$Response(params: DeleteOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOrder(params: DeleteOrder$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `updateItem()` */
  static readonly UpdateItemPath = '/seller/items/{ItemId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateItem()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateItem$Response(params: UpdateItem$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdateResponse>> {
    return updateItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateItem$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateItem(params: UpdateItem$Params, context?: HttpContext): Observable<UpdateResponse> {
    return this.updateItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<UpdateResponse>): UpdateResponse => r.body)
    );
  }

  /** Path part for operation `getItemUserById()` */
  static readonly GetItemUserByIdPath = '/seller/items/{UserId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemUserById$Response(params: GetItemUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Item>>> {
    return getItemUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getItemUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemUserById(params: GetItemUserById$Params, context?: HttpContext): Observable<Array<Item>> {
    return this.getItemUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Item>>): Array<Item> => r.body)
    );
  }

  /** Path part for operation `createItem()` */
  static readonly CreateItemPath = '/seller/items/{UserId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createItem()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createItem$Response(params: CreateItem$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return createItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createItem$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createItem(params: CreateItem$Params, context?: HttpContext): Observable<{
}> {
    return this.createItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllOrders()` */
  static readonly GetAllOrdersPath = '/seller/orders';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllOrders()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOrders$Response(params?: GetAllOrders$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getAllOrders(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllOrders$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOrders(params?: GetAllOrders$Params, context?: HttpContext): Observable<{
}> {
    return this.getAllOrders$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllItems1()` */
  static readonly GetAllItems1Path = '/seller/items';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllItems1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllItems1$Response(params?: GetAllItems1$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getAllItems1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllItems1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllItems1(params?: GetAllItems1$Params, context?: HttpContext): Observable<{
}> {
    return this.getAllItems1$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getItemById1()` */
  static readonly GetItemById1Path = '/seller/item/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemById1$Response(params: GetItemById1$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getItemById1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getItemById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemById1(params: GetItemById1$Params, context?: HttpContext): Observable<{
}> {
    return this.getItemById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `deleteItem()` */
  static readonly DeleteItemPath = '/seller/items/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteItem()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItem$Response(params: DeleteItem$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteItem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItem(params: DeleteItem$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
