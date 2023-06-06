import axios from 'axios';
import queryString from 'query-string';
import { PetCareInterface } from 'interfaces/pet-care';
import { GetQueryInterface } from '../../interfaces';

export const getPetCares = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/pet-cares${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPetCare = async (petCare: PetCareInterface) => {
  const response = await axios.post('/api/pet-cares', petCare);
  return response.data;
};

export const updatePetCareById = async (id: string, petCare: PetCareInterface) => {
  const response = await axios.put(`/api/pet-cares/${id}`, petCare);
  return response.data;
};

export const getPetCareById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/pet-cares/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePetCareById = async (id: string) => {
  const response = await axios.delete(`/api/pet-cares/${id}`);
  return response.data;
};
