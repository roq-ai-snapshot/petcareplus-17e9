import { PetInterface } from 'interfaces/pet';
import { UserInterface } from 'interfaces/user';

export interface AppointmentInterface {
  id?: string;
  pet_id: string;
  user_id: string;
  date: Date;
  created_at?: Date;
  updated_at?: Date;

  pet?: PetInterface;
  user?: UserInterface;
  _count?: {};
}
