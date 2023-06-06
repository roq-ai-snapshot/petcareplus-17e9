import * as yup from 'yup';
import { appointmentValidationSchema } from 'validationSchema/appointments';
import { vaccinationValidationSchema } from 'validationSchema/vaccinations';

export const petValidationSchema = yup.object().shape({
  name: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  pet_care_id: yup.string().nullable().required(),
  appointment: yup.array().of(appointmentValidationSchema),
  vaccination: yup.array().of(vaccinationValidationSchema),
});
