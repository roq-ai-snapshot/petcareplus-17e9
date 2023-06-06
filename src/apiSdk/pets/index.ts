import axios from 'axios';
import queryString from 'query-string';
import { PetInterface } from 'interfaces/pet';
import { GetQueryInterface } from '../../interfaces';

export const getPets = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/pets${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPet = async (pet: PetInterface) => {
  const response = await axios.post('/api/pets', pet);
  return response.data;
};

export const updatePetById = async (id: string, pet: PetInterface) => {
  const response = await axios.put(`/api/pets/${id}`, pet);
  return response.data;
};

export const getPetById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/pets/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePetById = async (id: string) => {
  const response = await axios.delete(`/api/pets/${id}`);
  return response.data;
};
