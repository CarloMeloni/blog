import { useState } from 'react';
import Link from 'next/link';
import { APP_NAME } from '../config';
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
                BLOG
            </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link href="/signin">
                  <NavLink>
                      Login
                  </NavLink>
              </Link>
            </NavItem>
            <NavItem>
                <Link href="/signup">
                <NavLink>
                      Registrati
                  </NavLink>
                </Link>
            </NavItem>
            
          </Nav>
          <NavbarText>THE-BLOG</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;