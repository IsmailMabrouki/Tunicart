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
  lastLogin?: string;
  lastName?: string;
  name?: string;
  password?: string;
  profileImage?: Image;
  purchaseOrders?: Array<PurchaseOrder>;
  registrationDate?: string;
  role?: Role;
  username?: string;
}
