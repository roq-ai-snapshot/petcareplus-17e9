import * as yup from 'yup';

export const vaccinationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  date: yup.date().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  pet_id: yup.string().nullable().required(),
});
