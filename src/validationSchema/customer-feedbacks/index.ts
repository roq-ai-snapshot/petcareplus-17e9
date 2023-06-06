import * as yup from 'yup';

export const customerFeedbackValidationSchema = yup.object().shape({
  rating: yup.number().integer().required(),
  comment: yup.string(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  product_id: yup.string().nullable().required(),
});
