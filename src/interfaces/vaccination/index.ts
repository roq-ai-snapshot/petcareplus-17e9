import { PetInterface } from 'interfaces/pet';

export interface VaccinationInterface {
  id?: string;
  pet_id: string;
  name: string;
  date: Date;
  created_at?: Date;
  updated_at?: Date;

  pet?: PetInterface;
  _count?: {};
}
