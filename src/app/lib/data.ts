'use server';

import {
  EnterpriseFormData,
  IBussinesType,
  IServicesRecommended,
} from '@/interfaces/enterprise-form';
import { convertServicesDurationToMinutes } from '@/utils/dates';

const { BOOKHUB_API } = process.env;

async function fetchBookHub(url: string, method: string, request?: any) {
  // Usa la URL relativa que pasará a través del proxy
  const options = {
    method: method,
    body: JSON.stringify(request),
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

export async function createBusiness(
  businessRQ: EnterpriseFormData
): Promise<any> {
  try {
    const url = `${BOOKHUB_API}/business`;
    const { business, location, openingHours, services, images } = businessRQ;

    const request = {
      business: {
        name: business.name,
        type: business.type,
        password: business.password,
        owner: {
          name: business.owner.name,
          mail: business.owner.mail,
          phone: `${business.owner.prefix ? business.owner.prefix : '+34'} ${
            business.owner.phone
          }`,
        },
      },
      location: {
        address: location.address,
        city: location.city,
        state: location.state,
        zipCode: location.zipCode,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
      },
      openingHours: {
        monday: openingHours.monday,
        tuesday: openingHours.tuesday,
        wednesday: openingHours.wednesday,
        thursday: openingHours.thursday,
        friday: openingHours.friday,
        saturday: openingHours.saturday,
        sunday: openingHours.sunday,
      },
      services: services.map((service) => {
        return {
          id: service.id,
          name: service.name,
          type: business.type.toString(),
          description: service.description || '',
          price: service.price,
          duration: convertServicesDurationToMinutes(service.duration),
        };
      }),
      images: {
        hero: '',
        additionalImages: [],
      },
    };

    const response: any = await fetchBookHub(url, 'POST', request);

    if (response.error && response.statusCode && response.statusCode >= 400) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    return error;
  }
}
