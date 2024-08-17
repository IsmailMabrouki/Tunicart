/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from '../models/granted-authority';
import { Image } from '../models/image';
import { Item } from '../models/item';
import { PurchaseOrder } from '../models/purchase-order';
import { Role } from '../models/role';
export interface User {
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  credentialsNonExpired?: boolean;
  dateOfBirth?: string;
  email?: string;
  enabled?: boolean;
  firstName?: string;
  fullName?: string;
  id?: number;
  items?: Array<Item>;
  lastName?: string;
  name?: string;
  password?: string;
  profileImage?: Image;
  purchaseOrders?: Array<PurchaseOrder>;
  role?: Role;
  username?: string;
}
