import { Navbar, NavbarBrand, NavbarContent, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/SakuraPantryLogo_resized.png';
import useAuth from './Auth/useAuth';
import UserMenu from './UserMenu';
import GuestMenu from './GuestMenu';
import SearchBar from './SearchBar';

export default function Header({ isAdminHeader }) {
  const { isAuthenticated } = useAuth();

  return (
    <Navbar
      isBlurred
      maxWidth='2xl'
      className='max-w-full py-4 min-h-[120px] md:min-h-[80px] bg-primary'
      height='auto'
      classNames={{
        wrapper: 'grid grid-cols-2 md:flex'
      }}
    >
      <NavbarBrand>
        <Link to='/'>
          <Image src={logo} className='w-full max-h-[50px] md:w-auto' />
        </Link>
      </NavbarBrand>
      {isAdminHeader ? null : (
        <NavbarContent className='gap-4 row-start-2 col-start-1 col-span-2' justify='center'>
          <SearchBar />
        </NavbarContent>
      )}
      <NavbarContent justify='end'>
        {isAuthenticated ? <UserMenu isAdminHeader={isAdminHeader} /> : <GuestMenu />}
      </NavbarContent>
    </Navbar>
  );
}
