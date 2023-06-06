import * as yup from 'yup';
import { customerFeedbackValidationSchema } from 'validationSchema/customer-feedbacks';

export const productValidationSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().integer().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  pet_care_id: yup.string().nullable().required(),
  customer_feedback: yup.array().of(customerFeedbackValidationSchema),
});
