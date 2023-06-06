import { PetInterface } from 'interfaces/pet';
import { ProductInterface } from 'interfaces/product';
import { UserInterface } from 'interfaces/user';

export interface PetCareInterface {
  id?: string;
  name: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  pet?: PetInterface[];
  product?: ProductInterface[];
  user?: UserInterface;
  _count?: {
    pet?: number;
    product?: number;
  };
}
