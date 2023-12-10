import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Image } from "@nextui-org/react";
import logo from '../assets/images/SakuraPantry.png';

export default function App() {
  return (
    <Navbar isBordered isBlurred maxWidth='2xl' className='max-w-full'>
      <NavbarBrand>
        <Link to="/">
          <Image src={logo} className="h-[50px]"/>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <p>Search bar will go here</p>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
