import useAuth from '../Auth/useAuth';
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
import CartInfo from '../Cart/CartInfo';

export default function UserMenu() {
  const { user, logout } = useAuth();

  return (
    <NavbarContent justify='end'>
      <NavbarItem className='flex items-center'>
        <CartInfo />
      </NavbarItem>
      <Dropdown placement='bottom-end'>
        <DropdownTrigger>
          <Avatar
            isBordered
            color='primary'
            as='button'
            className='transition-transform'
            name={user?.firstName}
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
