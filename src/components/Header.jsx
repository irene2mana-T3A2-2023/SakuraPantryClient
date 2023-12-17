import { Navbar, NavbarBrand, NavbarContent, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/SakuraPantryLogo_resized.png';
import useAuth from './Auth/useAuth';
import UserMenu from './UserMenu';
import GuestMenu from './GuestMenu';

export default function Header({ isAdminHeader }) {
  const { isAuthenticated } = useAuth();

  return (
    <Navbar isBordered isBlurred maxWidth='2xl' className='max-w-full bg-primary' height='80px'>
      <NavbarBrand>
        <Link to='/'>
          <Image src={logo} className='h-[50px]' />
        </Link>
      </NavbarBrand>
      {isAdminHeader ? null : (
        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          <p className='text-white'>Search bar will come here</p>
        </NavbarContent>
      )}
      <NavbarContent justify='end'>
        {isAuthenticated ? <UserMenu isAdminHeader={isAdminHeader} /> : <GuestMenu />}
      </NavbarContent>
    </Navbar>
  );
}
