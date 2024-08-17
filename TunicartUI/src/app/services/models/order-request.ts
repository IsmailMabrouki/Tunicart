/* tslint:disable */
/* eslint-disable */
import { Address } from '../models/address';
export interface OrderRequest {
  deliveryAddress?: Address;
  id?: number;
  item_id?: Array<number>;
  totalAmount?: number;
  userId?: number;
}
