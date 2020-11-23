import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
                {children}
            <p>FOOTER</p>
        </React.Fragment>
    )
}

export default Layout;