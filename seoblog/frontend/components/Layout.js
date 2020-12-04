import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
                {children}
            <div style={{ border: "1px solid black", display: "flex" }} className="col-md-12 mt-5">
                <p>FOOTER</p>
            </div>
        </React.Fragment>
    )
}

export default Layout;