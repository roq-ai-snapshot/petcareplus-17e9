import { UserInterface } from 'interfaces/user';
import { ProductInterface } from 'interfaces/product';

export interface CustomerFeedbackInterface {
  id?: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment?: string;
  created_at?: Date;
  updated_at?: Date;

  user?: UserInterface;
  product?: ProductInterface;
  _count?: {};
}
