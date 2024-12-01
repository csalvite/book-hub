// api.ts
'use server';
import axios from 'axios';

const { BOOKHUB_API } = process.env;

const api = axios.create({
  baseURL: BOOKHUB_API,
});

// export async function fetchBookHub(
//   endpoint: string,
//   method: string,
//   request?: any
// ) {
//   // Usa la URL relativa que pasará a través del proxy
//   const options = {
//     method: method,
//     body: JSON.stringify(request),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   const url = `${BOOKHUB_API}${endpoint}`;

//   const res = await fetch(url, options);

//   const response = (await res.json()) as any[];

//   return response;
// }

export const get = async (url: string, params?: any) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const post = async (url: string, data?: any, params?: any) => {
  try {
    const response = await api.post(url, data, { params });
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};
