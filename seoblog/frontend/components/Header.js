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
            {!isAuth() && (
              <>
                <NavItem>
                <Link href="/signin">
                    <NavLink style={{ cursor: "pointer" }}>
                        Login
                    </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                  <Link href="/signup">
                  <NavLink style={{ cursor: "pointer" }}>
                        Registrati
                    </NavLink>
                  </Link>
              </NavItem>
            </>
            )}
            {isAuth() && (
              <NavItem>
                <NavLink style={{ cursor: "pointer" }} onClick={() =>  signout(() => Router.replace('/signin')) }>
                      Logout
                </NavLink>
              </NavItem>
            )}
          </Nav>
          <NavbarText>THE-BLOG</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;