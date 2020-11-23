import React from 'react';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <p>HEADER</p>
                {children}
            <p>FOOTER</p>
        </React.Fragment>
    )
}

export default Layout;