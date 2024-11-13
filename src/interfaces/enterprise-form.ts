export interface EnterpriseFormData {
  business: {
    name: string;
    type: number;
    password: string;
    owner: {
      name: string;
      mail: string;
      phone: string;
      prefix?: string;
    };
  };
  location: IEnterpriseLocation;
  openingHours: IOpeningHours;
  services: IOptionServices[];
  images: {
    hero: string;
    additionalImages: string[];
  };
}

export interface IEnterpriseLocation {
  address?: string;
  addressNum?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  latitude: number;
  longitude: number;
}

export interface IOpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface IBussinesType {
  id: number;
  name: string;
}

export interface IBussinesType {
  id: number;
  name: string;
}

export interface IServicesRecommended {
  id: number;
  name: string;
}

export interface IOptionServices {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: number;
}

export interface IOpeningHoursSchedule {
  [key: string]: {
    day: string;
    schedule: string;
  };
}
