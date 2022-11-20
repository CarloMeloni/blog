import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
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
import '../node_modules/nprogress/nprogress.css';
import Search from './blog/Search';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar color="dark" light expand="md">
        <Link href="/">
            <NavLink style={{ cursor: "pointer", color: "#fff" }} className="font-weight-bold">
                {APP_NAME}
            </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          </Nav>
                <Link href="/blogs">
                    <NavLink style={{ cursor: "pointer", color: "#fff" }}>
                        Articoli
                    </NavLink>
                </Link>
                <Link href="/contact">
                    <NavLink style={{ cursor: "pointer", color: "#fff" }}>
                        Contatti
                    </NavLink>
                </Link>
          {!isAuth() && (
              <>
                <Link href="/signin">
                    <NavLink style={{ cursor: "pointer", color: "#fff" }}>
                        Login
                    </NavLink>
                </Link>
                  <Link href="/signup">
                  <NavLink style={{ cursor: "pointer", color: "#fff" }}>
                        Registrati
                    </NavLink>
                  </Link>
              </>
            )}
            {isAuth() && isAuth().role === 0 && (
                <NavLink>
                  <Link href='/user'>
                    <a style={{ color: "#178DB3"}}>
                      {isAuth().name}
                    </a>
                  </Link>
                </NavLink>
            )}
            {isAuth() && isAuth().role === 1 && (
                <NavLink>
                  <Link style={{ cursor: "pointer" }} href='/admin'>
                    <a style={{ color: "#FFEC96"}}>
                      {isAuth().name}
                    </a>
                  </Link>
                </NavLink>
            )}
          {isAuth() && (
                <NavLink style={{ cursor: "pointer", color: "#fff" }} onClick={() =>  signout(() => Router.replace('/signin')) }>
                      Logout
                </NavLink>
            )}
            <Link href="/user/crud/blog">
                <NavLink className="btn btn-danger m-2" style={{ cursor: "pointer"}}>
                    Pubblica un articolo
                </NavLink>
            </Link>
          <NavbarText style={{ cursor: "pointer", color: "#fff" }}>THE-BLOG</NavbarText>
        </Collapse>
      </Navbar>
      <Search />
    </>
  );
}

export default Header;