import axios from 'axios';
import queryString from 'query-string';
import { CustomerFeedbackInterface } from 'interfaces/customer-feedback';
import { GetQueryInterface } from '../../interfaces';

export const getCustomerFeedbacks = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/customer-feedbacks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCustomerFeedback = async (customerFeedback: CustomerFeedbackInterface) => {
  const response = await axios.post('/api/customer-feedbacks', customerFeedback);
  return response.data;
};

export const updateCustomerFeedbackById = async (id: string, customerFeedback: CustomerFeedbackInterface) => {
  const response = await axios.put(`/api/customer-feedbacks/${id}`, customerFeedback);
  return response.data;
};

export const getCustomerFeedbackById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/customer-feedbacks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCustomerFeedbackById = async (id: string) => {
  const response = await axios.delete(`/api/customer-feedbacks/${id}`);
  return response.data;
};
