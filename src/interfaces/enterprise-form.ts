export interface EnterpriseFormData {
  business: {
    name: string;
    type: string;
    password: string;
    owner: {
      name: string;
      mail: string;
      phone: string;
      prefix?: string;
    };
  };
  location: {
    address: string;
    addressNum: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  openingHours: IOpeningHours;
  services: [
    {
      name: string;
      type: string;
      description: string;
      price: number;
      duration: number;
    }
  ];
  images: {
    hero: string;
    additionalImages: string[];
  };
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
