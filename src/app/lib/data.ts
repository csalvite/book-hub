'use server';

import {
  IBussinesType,
  IServicesRecommended,
} from '@/interfaces/enterprise-form';

const { BOOKHUB_API } = process.env;

async function fetchBookHub(url: string, method: string) {
  // Usa la URL relativa que pasará a través del proxy
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = await fetch(url, options);

  const response = (await res.json()) as any[];

  return response;
}

export async function getBusinessTypes(
  search: string
): Promise<IBussinesType[]> {
  try {
    const url = `${BOOKHUB_API}/business/type?search=${search}`;

    const response: IBussinesType[] = await fetchBookHub(url, 'GET');

    return response;
  } catch (error) {
    throw new Error('Failed to fetch');
  }
}

export async function getServicesRecommended(
  id?: number
): Promise<IServicesRecommended[]> {
  try {
    const url = `${BOOKHUB_API}/services/recommended?businessTypeId=${id}`;

    const response: IServicesRecommended[] = await fetchBookHub(url, 'GET');

    return response;
  } catch (error) {
    throw new Error('Failed to obtain services recommended');
  }
}
