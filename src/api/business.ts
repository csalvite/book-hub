// business.ts
import { IBussinesType } from '@/interfaces/enterprise-form';
import { get, post } from './api';

export const getBusinessTypes = async (
  search: string
): Promise<IBussinesType[]> => {
  const url = `/business/type?search=${search}`;

  return await get(url);
};

export const createBusiness = async (data: any) => {
  const url = '/business';
  return await post(url, data);
};

// Add other functions related to the business API
