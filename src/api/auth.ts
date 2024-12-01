// auth.ts
import { get, post } from './api';

export const login = async (data: any) => {
  const url = '/auth/login';
  return await post(url, data);
};

export const register = async (data: any) => {
  const url = '/auth/register';
  return await post(url, data);
};

// Add other functions related to the authentication API
