/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ActivityHistory } from '../models/activity-history';
import { addItemToCart } from '../fn/user/add-item-to-cart';
import { AddItemToCart$Params } from '../fn/user/add-item-to-cart';
import { deleteCart } from '../fn/user/delete-cart';
import { DeleteCart$Params } from '../fn/user/delete-cart';
import { deleteItemFeedback } from '../fn/user/delete-item-feedback';
import { DeleteItemFeedback$Params } from '../fn/user/delete-item-feedback';
import { Feedback } from '../models/feedback';
import { FeedbackResponse } from '../models/feedback-response';
import { getActivityHistoryByUserId } from '../fn/user/get-activity-history-by-user-id';
import { GetActivityHistoryByUserId$Params } from '../fn/user/get-activity-history-by-user-id';
import { getAllItems } from '../fn/user/get-all-items';
import { GetAllItems$Params } from '../fn/user/get-all-items';
import { getCart } from '../fn/user/get-cart';
import { GetCart$Params } from '../fn/user/get-cart';
import { getFeedbackByItemId } from '../fn/user/get-feedback-by-item-id';
import { GetFeedbackByItemId$Params } from '../fn/user/get-feedback-by-item-id';
import { getItemById } from '../fn/user/get-item-by-id';
import { GetItemById$Params } from '../fn/user/get-item-by-id';
import { getOrderById } from '../fn/user/get-order-by-id';
import { GetOrderById$Params } from '../fn/user/get-order-by-id';
import { getOrderHistory } from '../fn/user/get-order-history';
import { GetOrderHistory$Params } from '../fn/user/get-order-history';
import { placeOrder } from '../fn/user/place-order';
import { PlaceOrder$Params } from '../fn/user/place-order';
import { removeItemFromCart } from '../fn/user/remove-item-from-cart';
import { RemoveItemFromCart$Params } from '../fn/user/remove-item-from-cart';
import { saveFeedbackForItem } from '../fn/user/save-feedback-for-item';
import { SaveFeedbackForItem$Params } from '../fn/user/save-feedback-for-item';
import { searchItems } from '../fn/user/search-items';
import { SearchItems$Params } from '../fn/user/search-items';
import { updateCartItem } from '../fn/user/update-cart-item';
import { UpdateCartItem$Params } from '../fn/user/update-cart-item';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateCartItem()` */
  static readonly UpdateCartItemPath = '/user/cart/items/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCartItem()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCartItem$Response(params: UpdateCartItem$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateCartItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCartItem$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCartItem(params: UpdateCartItem$Params, context?: HttpContext): Observable<{
}> {
    return this.updateCartItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `placeOrder()` */
  static readonly PlaceOrderPath = '/user/orders';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `placeOrder()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  placeOrder$Response(params: PlaceOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: {
};
}>> {
    return placeOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `placeOrder$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  placeOrder(params: PlaceOrder$Params, context?: HttpContext): Observable<{
[key: string]: {
};
}> {
    return this.placeOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: {
};
}>): {
[key: string]: {
};
} => r.body)
    );
  }

  /** Path part for operation `getFeedbackByItemId()` */
  static readonly GetFeedbackByItemIdPath = '/user/items/{itemId}/feedback';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFeedbackByItemId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFeedbackByItemId$Response(params: GetFeedbackByItemId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FeedbackResponse>>> {
    return getFeedbackByItemId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFeedbackByItemId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFeedbackByItemId(params: GetFeedbackByItemId$Params, context?: HttpContext): Observable<Array<FeedbackResponse>> {
    return this.getFeedbackByItemId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FeedbackResponse>>): Array<FeedbackResponse> => r.body)
    );
  }

  /** Path part for operation `saveFeedbackForItem()` */
  static readonly SaveFeedbackForItemPath = '/user/items/{itemId}/feedback';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveFeedbackForItem()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFeedbackForItem$Response(params: SaveFeedbackForItem$Params, context?: HttpContext): Observable<StrictHttpResponse<Feedback>> {
    return saveFeedbackForItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveFeedbackForItem$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFeedbackForItem(params: SaveFeedbackForItem$Params, context?: HttpContext): Observable<Feedback> {
    return this.saveFeedbackForItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<Feedback>): Feedback => r.body)
    );
  }

  /** Path part for operation `deleteItemFeedback()` */
  static readonly DeleteItemFeedbackPath = '/user/items/{itemId}/feedback';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteItemFeedback()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItemFeedback$Response(params: DeleteItemFeedback$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteItemFeedback(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteItemFeedback$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItemFeedback(params: DeleteItemFeedback$Params, context?: HttpContext): Observable<void> {
    return this.deleteItemFeedback$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `addItemToCart()` */
  static readonly AddItemToCartPath = '/user/cart/items/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addItemToCart()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addItemToCart$Response(params: AddItemToCart$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return addItemToCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addItemToCart$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addItemToCart(params: AddItemToCart$Params, context?: HttpContext): Observable<{
}> {
    return this.addItemToCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getOrderById()` */
  static readonly GetOrderByIdPath = '/user/orders/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrderById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderById$Response(params: GetOrderById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getOrderById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrderById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderById(params: GetOrderById$Params, context?: HttpContext): Observable<{
}> {
    return this.getOrderById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getOrderHistory()` */
  static readonly GetOrderHistoryPath = '/user/orders/history/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrderHistory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderHistory$Response(params: GetOrderHistory$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getOrderHistory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrderHistory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderHistory(params: GetOrderHistory$Params, context?: HttpContext): Observable<{
}> {
    return this.getOrderHistory$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllItems()` */
  static readonly GetAllItemsPath = '/user/items';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllItems()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllItems$Response(params?: GetAllItems$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getAllItems(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllItems$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllItems(params?: GetAllItems$Params, context?: HttpContext): Observable<{
}> {
    return this.getAllItems$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getItemById()` */
  static readonly GetItemByIdPath = '/user/items/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemById$Response(params: GetItemById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getItemById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getItemById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemById(params: GetItemById$Params, context?: HttpContext): Observable<{
}> {
    return this.getItemById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `searchItems()` */
  static readonly SearchItemsPath = '/user/items/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchItems()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchItems$Response(params: SearchItems$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return searchItems(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchItems$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchItems(params: SearchItems$Params, context?: HttpContext): Observable<{
}> {
    return this.searchItems$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getCart()` */
  static readonly GetCartPath = '/user/cart/{UserId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart$Response(params: GetCart$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart(params: GetCart$Params, context?: HttpContext): Observable<{
}> {
    return this.getCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getActivityHistoryByUserId()` */
  static readonly GetActivityHistoryByUserIdPath = '/user/activities/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActivityHistoryByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivityHistoryByUserId$Response(params: GetActivityHistoryByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ActivityHistory>>> {
    return getActivityHistoryByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getActivityHistoryByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivityHistoryByUserId(params: GetActivityHistoryByUserId$Params, context?: HttpContext): Observable<Array<ActivityHistory>> {
    return this.getActivityHistoryByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ActivityHistory>>): Array<ActivityHistory> => r.body)
    );
  }

  /** Path part for operation `deleteCart()` */
  static readonly DeleteCartPath = '/user/cart/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCart$Response(params: DeleteCart$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCart(params: DeleteCart$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `removeItemFromCart()` */
  static readonly RemoveItemFromCartPath = '/user/cart/items/{CartItem_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeItemFromCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeItemFromCart$Response(params: RemoveItemFromCart$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: string;
}>> {
    return removeItemFromCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeItemFromCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeItemFromCart(params: RemoveItemFromCart$Params, context?: HttpContext): Observable<{
[key: string]: string;
}> {
    return this.removeItemFromCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: string;
}>): {
[key: string]: string;
} => r.body)
    );
  }

}
