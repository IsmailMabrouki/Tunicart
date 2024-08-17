/* tslint:disable */
/* eslint-disable */
import { Item } from '../models/item';
export interface Feedback {
  comment?: string;
  feedbackDate?: string;
  id?: number;
  item?: Item;
  rating?: number;
}
