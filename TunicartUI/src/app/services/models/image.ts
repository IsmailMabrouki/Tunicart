/* tslint:disable */
/* eslint-disable */
import { Item } from '../models/item';
import { User } from '../models/user';
export interface Image {
  data?: Array<string>;
  fileName?: string;
  id?: number;
  item?: Item;
  user?: User;
}
