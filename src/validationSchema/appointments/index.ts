import * as yup from 'yup';

export const appointmentValidationSchema = yup.object().shape({
  date: yup.date().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  pet_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
