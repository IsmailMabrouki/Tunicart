/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createItem1 } from '../fn/admin/create-item-1';
import { CreateItem1$Params } from '../fn/admin/create-item-1';
import { deleteItem1 } from '../fn/admin/delete-item-1';
import { DeleteItem1$Params } from '../fn/admin/delete-item-1';
import { deleteRole } from '../fn/admin/delete-role';
import { DeleteRole$Params } from '../fn/admin/delete-role';
import { deleteUser } from '../fn/admin/delete-user';
import { DeleteUser$Params } from '../fn/admin/delete-user';
import { DetailedSystemStats } from '../models/detailed-system-stats';
import { getAllItems3 } from '../fn/admin/get-all-items-3';
import { GetAllItems3$Params } from '../fn/admin/get-all-items-3';
import { getAllRoles } from '../fn/admin/get-all-roles';
import { GetAllRoles$Params } from '../fn/admin/get-all-roles';
import { getAllUsers } from '../fn/admin/get-all-users';
import { GetAllUsers$Params } from '../fn/admin/get-all-users';
import { getItemById3 } from '../fn/admin/get-item-by-id-3';
import { GetItemById3$Params } from '../fn/admin/get-item-by-id-3';
import { getItemUserById1 } from '../fn/admin/get-item-user-by-id-1';
import { GetItemUserById1$Params } from '../fn/admin/get-item-user-by-id-1';
import { getRoleById } from '../fn/admin/get-role-by-id';
import { GetRoleById$Params } from '../fn/admin/get-role-by-id';
import { getSystemStats } from '../fn/admin/get-system-stats';
import { GetSystemStats$Params } from '../fn/admin/get-system-stats';
import { getUserById } from '../fn/admin/get-user-by-id';
import { GetUserById$Params } from '../fn/admin/get-user-by-id';
import { Item } from '../models/item';
import { updateItem1 } from '../fn/admin/update-item-1';
import { UpdateItem1$Params } from '../fn/admin/update-item-1';
import { updateRole } from '../fn/admin/update-role';
import { UpdateRole$Params } from '../fn/admin/update-role';
import { updateUser } from '../fn/admin/update-user';
import { UpdateUser$Params } from '../fn/admin/update-user';

@Injectable({ providedIn: 'root' })
export class AdminService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getUserById()` */
  static readonly GetUserByIdPath = '/admin/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: GetUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: GetUserById$Params, context?: HttpContext): Observable<{
}> {
    return this.getUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `updateUser()` */
  static readonly UpdateUserPath = '/admin/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser$Response(params: UpdateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser(params: UpdateUser$Params, context?: HttpContext): Observable<{
}> {
    return this.updateUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `deleteUser()` */
  static readonly DeleteUserPath = '/admin/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: DeleteUser$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: DeleteUser$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getRoleById()` */
  static readonly GetRoleByIdPath = '/admin/roles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRoleById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRoleById$Response(params: GetRoleById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getRoleById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRoleById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRoleById(params: GetRoleById$Params, context?: HttpContext): Observable<{
}> {
    return this.getRoleById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `updateRole()` */
  static readonly UpdateRolePath = '/admin/roles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRole$Response(params: UpdateRole$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateRole(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRole(params: UpdateRole$Params, context?: HttpContext): Observable<{
}> {
    return this.updateRole$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `deleteRole()` */
  static readonly DeleteRolePath = '/admin/roles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRole$Response(params: DeleteRole$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteRole(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRole(params: DeleteRole$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteRole$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getItemUserById1()` */
  static readonly GetItemUserById1Path = '/admin/items/{UserId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemUserById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemUserById1$Response(params: GetItemUserById1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Item>>> {
    return getItemUserById1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getItemUserById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemUserById1(params: GetItemUserById1$Params, context?: HttpContext): Observable<Array<Item>> {
    return this.getItemUserById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Item>>): Array<Item> => r.body)
    );
  }

  /** Path part for operation `updateItem1()` */
  static readonly UpdateItem1Path = '/admin/items/{UserId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateItem1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateItem1$Response(params: UpdateItem1$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateItem1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateItem1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateItem1(params: UpdateItem1$Params, context?: HttpContext): Observable<{
}> {
    return this.updateItem1$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `createItem1()` */
  static readonly CreateItem1Path = '/admin/items/{UserId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createItem1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createItem1$Response(params: CreateItem1$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return createItem1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createItem1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createItem1(params: CreateItem1$Params, context?: HttpContext): Observable<{
}> {
    return this.createItem1$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllUsers()` */
  static readonly GetAllUsersPath = '/admin/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params?: GetAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getAllUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params?: GetAllUsers$Params, context?: HttpContext): Observable<{
}> {
    return this.getAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getSystemStats()` */
  static readonly GetSystemStatsPath = '/admin/stats';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSystemStats()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSystemStats$Response(params?: GetSystemStats$Params, context?: HttpContext): Observable<StrictHttpResponse<DetailedSystemStats>> {
    return getSystemStats(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSystemStats$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSystemStats(params?: GetSystemStats$Params, context?: HttpContext): Observable<DetailedSystemStats> {
    return this.getSystemStats$Response(params, context).pipe(
      map((r: StrictHttpResponse<DetailedSystemStats>): DetailedSystemStats => r.body)
    );
  }

  /** Path part for operation `getAllRoles()` */
  static readonly GetAllRolesPath = '/admin/roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllRoles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRoles$Response(params?: GetAllRoles$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getAllRoles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllRoles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRoles(params?: GetAllRoles$Params, context?: HttpContext): Observable<{
}> {
    return this.getAllRoles$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllItems3()` */
  static readonly GetAllItems3Path = '/admin/items';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllItems3()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllItems3$Response(params?: GetAllItems3$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getAllItems3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllItems3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllItems3(params?: GetAllItems3$Params, context?: HttpContext): Observable<{
}> {
    return this.getAllItems3$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getItemById3()` */
  static readonly GetItemById3Path = '/admin/items/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemById3()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemById3$Response(params: GetItemById3$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getItemById3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getItemById3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemById3(params: GetItemById3$Params, context?: HttpContext): Observable<{
}> {
    return this.getItemById3$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `deleteItem1()` */
  static readonly DeleteItem1Path = '/admin/items/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteItem1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItem1$Response(params: DeleteItem1$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteItem1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteItem1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItem1(params: DeleteItem1$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteItem1$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
