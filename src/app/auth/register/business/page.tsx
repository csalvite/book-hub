'use client';
import MultiStepForm from '@/components/Forms/Bussiness/MultiStepForm';
import { RegisterForm } from '@/components/Forms/User/RegisterForm';
import { OpenCards } from '@/components/OpenCards/OpenCards';

export default function Home() {
  // return <RegisterForm title='Crea un negocio' business={true} />;
  return <MultiStepForm />;
}
