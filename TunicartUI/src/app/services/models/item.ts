/* tslint:disable */
/* eslint-disable */
import { Category } from '../models/category';
import { Feedback } from '../models/feedback';
import { Image } from '../models/image';
import { PurchaseOrder } from '../models/purchase-order';
import { User } from '../models/user';
export interface Item {
  ItemImage?: Image;
  category?: Category;
  description?: string;
  feedbacks?: Array<Feedback>;
  id?: number;
  itemImage?: Image;
  name?: string;
  price?: number;
  purchaseOrder?: PurchaseOrder;
  quantity?: number;
  user?: User;
}
