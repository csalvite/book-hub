'use server';

const { BOOKHUB_API } = process.env;

export async function fetchApiPrueba(search: string) {
  try {
    // Usa la URL relativa que pasará a través del proxy
    const url = `${BOOKHUB_API}/business/type?search=${search}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await fetch(url, options);

    const response = (await res.json()) as any[];

    return response;
  } catch (error) {
    console.error('Error fetching prueba api: ', error);
    throw new Error('Failed to fetch api prueba');
  }
}
