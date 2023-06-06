import { CustomerFeedbackInterface } from 'interfaces/customer-feedback';
import { PetCareInterface } from 'interfaces/pet-care';

export interface ProductInterface {
  id?: string;
  pet_care_id: string;
  name: string;
  price: number;
  created_at?: Date;
  updated_at?: Date;
  customer_feedback?: CustomerFeedbackInterface[];
  pet_care?: PetCareInterface;
  _count?: {
    customer_feedback?: number;
  };
}
