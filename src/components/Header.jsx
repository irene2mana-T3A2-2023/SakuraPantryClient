import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/SakuraPantryLogo.png';
import useAuth from './Auth/useAuth';

export default function Header() {
  const value = useAuth;
  return (
    <Navbar isBordered isBlurred maxWidth='2xl' className='max-w-full bg-primary'>
      <NavbarBrand>
        <Link to='/'>
          <Image src={logo} className='h-[50px]' />
        </Link>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <p className='text-white'>Search bar will come here</p>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Button as={Link} color='secondary' variant='solid' to='/sign-in'>
            Sign In
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color='secondary' variant='light' to='/sign-up'>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
