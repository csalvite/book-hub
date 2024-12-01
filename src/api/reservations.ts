// reservations.ts
import { get, post } from './api';

export const getReservations = async (params?: any) => {
  const url = '/reservations';
  return await get(url, params);
};

export const createReservation = async (data: any) => {
  const url = '/reservations';
  return await post(url, data);
};

// Add other functions related to the reservations API
