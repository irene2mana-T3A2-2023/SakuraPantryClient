import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import CartInHeader from './CartInHeader';
import useAuth from './Auth/useAuth';

export default function UserMenu() {
  const { user, logout } = useAuth();

  return (
    <NavbarContent justify='end'>
      <NavbarItem className='flex items-center pr-2 lg:pr-5'>
        <CartInHeader />
      </NavbarItem>
      <Dropdown placement='bottom-end'>
        <DropdownTrigger>
          <Avatar
            color='secondary'
            as='button'
            className='transition-transform'
            name={`${user?.firstName} ${user?.lastName}`}
            size='sm'
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem key='profile' className='h-10'>
            <p className='font-semibold'>
              Hi, {user.firstName} {user.lastName}
            </p>
          </DropdownItem>
          <DropdownItem key='user-account'>
            <Link to='/user-account'>User account</Link>
          </DropdownItem>
          {user?.role === 'admin' && (
            <DropdownItem key='admin-dashboard'>
              <Link to='/admin-dashboard'>Admin dashboard</Link>
            </DropdownItem>
          )}
          <DropdownItem key='logout' onClick={logout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
}
