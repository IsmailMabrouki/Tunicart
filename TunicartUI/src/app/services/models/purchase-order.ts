/* tslint:disable */
/* eslint-disable */
import { Address } from '../models/address';
import { Item } from '../models/item';
import { User } from '../models/user';
export interface PurchaseOrder {
  deliveryAddress?: Address;
  id?: number;
  items?: Array<Item>;
  orderDate?: string;
  status?: 'PENDING' | 'SHIPPED' | 'OUTFORDELIVERY' | 'DELIVERED' | 'CANCELLED';
  totalAmount?: number;
  user?: User;
}
