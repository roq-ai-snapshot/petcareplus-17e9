import axios from 'axios';
import queryString from 'query-string';
import { VaccinationInterface } from 'interfaces/vaccination';
import { GetQueryInterface } from '../../interfaces';

export const getVaccinations = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/vaccinations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createVaccination = async (vaccination: VaccinationInterface) => {
  const response = await axios.post('/api/vaccinations', vaccination);
  return response.data;
};

export const updateVaccinationById = async (id: string, vaccination: VaccinationInterface) => {
  const response = await axios.put(`/api/vaccinations/${id}`, vaccination);
  return response.data;
};

export const getVaccinationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/vaccinations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVaccinationById = async (id: string) => {
  const response = await axios.delete(`/api/vaccinations/${id}`);
  return response.data;
};
