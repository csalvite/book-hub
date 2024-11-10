export function validateServices(
  price: number,
  hours?: string,
  minutes?: string
) {
  if (
    (!hours && !minutes) ||
    (hours && hours?.length < 1 && minutes && minutes?.length < 1) ||
    (hours === '00' && minutes === '00')
  )
    return {
      prop: 'time',
      isValid: false,
    };

  if (!price)
    return {
      prop: 'price',
      isValid: false,
    };

  return {
    prop: '',
    isValid: true,
  };
}

export function validateInput(name: string, value: string): boolean {
  switch (name) {
    case 'name':
    case 'ownerName':
    case 'address':
    case 'city':
    case 'state':
    case 'country':
      return value.trim().length > 2; // Ejemplo: mínimo 3 caracteres
    case 'addressNum':
      return /^\d+$/.test(value) && Number(value) > 0; // solo dígitos y mayor de 0
    case 'zipCode':
      return /^\d+$/.test(value) && value.length > 4; // solo dígitos y al menos 5 caracteres
    case 'password':
      return value.length >= 6; // Ejemplo: mínimo 6 caracteres
    case 'ownerMail':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Ejemplo: formato de email
    case 'ownerPhone':
      return /^\d+$/.test(value) && value.length >= 9; // Ejemplo: solo dígitos y al menos 9 caracteres
    default:
      return true;
  }
}
