import * as yup from 'yup';
import { petValidationSchema } from 'validationSchema/pets';
import { productValidationSchema } from 'validationSchema/products';

export const petCareValidationSchema = yup.object().shape({
  name: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  pet: yup.array().of(petValidationSchema),
  product: yup.array().of(productValidationSchema),
});
