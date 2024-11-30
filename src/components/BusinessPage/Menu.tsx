import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Input,
} from '@nextui-org/react';
import { AcmeLogo } from './AcmeLogo';
import { EyeSlashFilledIcon } from '../Forms/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../Forms/EyeFilledIcon';

export const MenuBusinessPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [doLogin, setDoLogin] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const menuItems = [
    {
      id: 'who-we-are',
      name: 'Quienes Somos',
    },
    {
      id: 'why-book-hub',
      name: 'Por qué book-hub',
    },
    {
      id: 'payments',
      name: 'Suscripciones',
    },
    {
      id: 'contact-us',
      name: 'Contáctanos',
    },
  ];

  return (
    <section className='flex flex-col gap-4 p-4'>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='sm:hidden'
          />
          <NavbarBrand>
            <AcmeLogo />
            <p className='font-bold text-inherit'>ACME</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='hidden sm:flex gap-8 px-4' justify='center'>
          {menuItems.map((item) => {
            return (
              <NavbarItem key={item.id}>
                <Link color='foreground' href='#' aria-current='page'>
                  {item.name}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        <NavbarContent justify='end'>
          <NavbarItem className='hidden lg:flex'>
            <Button onClick={() => setDoLogin(!doLogin)}>Inicia Sesión</Button>
          </NavbarItem>
          <NavbarItem>
            <Button>
              <Link href={'/auth/register/business'}>
                <p className='p-2 inline-block flex items-center justify-center gap-2 text-slate-950'>
                  <i className='fa-solid fa-shop text-2xl'></i>{' '}
                  <span className='hover:underline'>Registra tu negocio</span>
                </p>
              </Link>
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
                }
                className='w-full'
                href='#'
                size='lg'
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      {doLogin && (
        <section className='w-full flex items-center justify-center gap-4'>
          <Input
            isClearable
            type='email'
            label='Email'
            variant='bordered'
            placeholder='Enter your email'
            onClear={() => console.log('input cleared')}
            className='max-w-xs'
          />
          <Input
            label='Password'
            variant='bordered'
            placeholder='Enter your password'
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={toggleVisibility}
                aria-label='toggle password visibility'
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                ) : (
                  <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            className='max-w-xs'
          />
          <Button
            color='primary'
            variant='ghost'
            isLoading={loading}
            onClick={() => setLoading(true)}
          >
            Iniciar Sesión
          </Button>
        </section>
      )}
    </section>
  );
};
