/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ApiResponse } from '../models/api-response';
import { deleteImage } from '../fn/image/delete-image';
import { DeleteImage$Params } from '../fn/image/delete-image';
import { deleteItemImage } from '../fn/image/delete-item-image';
import { DeleteItemImage$Params } from '../fn/image/delete-item-image';
import { getImageByidItem } from '../fn/image/get-image-byid-item';
import { GetImageByidItem$Params } from '../fn/image/get-image-byid-item';
import { getImageByidUser } from '../fn/image/get-image-byid-user';
import { GetImageByidUser$Params } from '../fn/image/get-image-byid-user';
import { uploadImage } from '../fn/image/upload-image';
import { UploadImage$Params } from '../fn/image/upload-image';
import { uploadItemImage } from '../fn/image/upload-item-image';
import { UploadItemImage$Params } from '../fn/image/upload-item-image';

@Injectable({ providedIn: 'root' })
export class ImageService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `uploadImage()` */
  static readonly UploadImagePath = '/image/user/upload/{idUser}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadImage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadImage$Response(params: UploadImage$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponse>> {
    return uploadImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadImage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadImage(params: UploadImage$Params, context?: HttpContext): Observable<ApiResponse> {
    return this.uploadImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponse>): ApiResponse => r.body)
    );
  }

  /** Path part for operation `uploadItemImage()` */
  static readonly UploadItemImagePath = '/image/item/upload/{ItemId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadItemImage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadItemImage$Response(params: UploadItemImage$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiResponse>> {
    return uploadItemImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadItemImage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadItemImage(params: UploadItemImage$Params, context?: HttpContext): Observable<ApiResponse> {
    return this.uploadItemImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiResponse>): ApiResponse => r.body)
    );
  }

  /** Path part for operation `getImageByidUser()` */
  static readonly GetImageByidUserPath = '/image/user/get/{idUser}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImageByidUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageByidUser$Response(params: GetImageByidUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return getImageByidUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getImageByidUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageByidUser(params: GetImageByidUser$Params, context?: HttpContext): Observable<Array<string>> {
    return this.getImageByidUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

  /** Path part for operation `getImageByidItem()` */
  static readonly GetImageByidItemPath = '/image/item/get/{idItem}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImageByidItem()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageByidItem$Response(params: GetImageByidItem$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return getImageByidItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getImageByidItem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageByidItem(params: GetImageByidItem$Params, context?: HttpContext): Observable<Array<string>> {
    return this.getImageByidItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

  /** Path part for operation `deleteImage()` */
  static readonly DeleteImagePath = '/image/user/delete/{idUser}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImage$Response(params: DeleteImage$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImage(params: DeleteImage$Params, context?: HttpContext): Observable<string> {
    return this.deleteImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `deleteItemImage()` */
  static readonly DeleteItemImagePath = '/image/item/delete/{idItem}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteItemImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItemImage$Response(params: DeleteItemImage$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteItemImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteItemImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItemImage(params: DeleteItemImage$Params, context?: HttpContext): Observable<string> {
    return this.deleteItemImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
