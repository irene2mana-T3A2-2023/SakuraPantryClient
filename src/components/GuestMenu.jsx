import {
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import CardInHeader from './CartInHeader';

export default function GuestMenu() {
  return (
    <NavbarContent justify='end'>
      <NavbarItem className='flex items-center pr-2 lg:pr-5'>
        <CardInHeader />
      </NavbarItem>
      <NavbarItem className='lg:flex hidden'>
        <Button as={Link} color='secondary' variant='solid' to='/sign-in'>
          Sign In
        </Button>
      </NavbarItem>
      <NavbarItem className='lg:flex hidden'>
        <Button as={Link} color='secondary' variant='light' to='/sign-up'>
          Sign Up
        </Button>
      </NavbarItem>
      <NavbarItem className='lg:hidden'>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant='light'>
              <FiUser className='w-6 h-6' />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label='Static Actions'>
            <DropdownItem key='login'>
              <Link to='/sign-in'>Login</Link>
            </DropdownItem>
            <DropdownItem key='register'>
              <Link to='/sign-up'>Create account</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarItem>
    </NavbarContent>
  );
}
