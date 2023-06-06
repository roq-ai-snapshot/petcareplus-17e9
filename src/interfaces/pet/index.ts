import { AppointmentInterface } from 'interfaces/appointment';
import { VaccinationInterface } from 'interfaces/vaccination';
import { PetCareInterface } from 'interfaces/pet-care';

export interface PetInterface {
  id?: string;
  name: string;
  pet_care_id: string;
  created_at?: Date;
  updated_at?: Date;
  appointment?: AppointmentInterface[];
  vaccination?: VaccinationInterface[];
  pet_care?: PetCareInterface;
  _count?: {
    appointment?: number;
    vaccination?: number;
  };
}
