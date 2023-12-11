import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Image
} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/SakuraPantry.png';
import useAuth from './Auth/useAuth';

export default function Header() {
  const { isAuthenticated } = useAuth();

  // eslint-disable-next-line no-console
  console.log({ isAuthenticated });

  return (
    <Navbar isBordered isBlurred maxWidth='2xl' className='max-w-full'>
      <NavbarBrand>
        <Link to='/'>
          <Image src={logo} className='h-[50px]' />
        </Link>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <p>Search bar will go here</p>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link to='/sign-in'>Sign In</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color='primary' to='/sign-up' variant='flat'>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
