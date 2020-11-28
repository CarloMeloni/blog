import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { APP_NAME } from '../config';
import { signout, isAuth, signin } from '../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
            <NavLink className="font-weight-bold">
                {APP_NAME}
            </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          </Nav>
          {!isAuth() && (
              <>
                
                <Link href="/signin">
                    <NavLink style={{ cursor: "pointer" }}>
                        Login
                    </NavLink>
                </Link>
              
              
                  <Link href="/signup">
                  <NavLink style={{ cursor: "pointer" }}>
                        Registrati
                    </NavLink>
                  </Link>
              
            </>
            )}
            {isAuth() && isAuth().role === 0 && (
              
                <NavLink>
                  <Link href='/user'>
                    {`${isAuth().name}, la tua Dashboard.`}
                  </Link>
                </NavLink>
              
            )}
            {isAuth() && isAuth().role === 1 && (
              
                <NavLink>
                  <Link href='/admin'>
                    {`${isAuth().name}, la tua Dashboard.`}
                  </Link>
                </NavLink>
              
            )}
          {isAuth() && (
                <NavLink style={{ cursor: "pointer" }} onClick={() =>  signout(() => Router.replace('/signin')) }>
                      Logout
                </NavLink>
            )}
          <NavbarText>THE-BLOG</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;