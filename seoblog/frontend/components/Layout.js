import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
                {children}
            <div style={{ border: "1px solid black" }} className="col-md-12 mt-5">
                <p className="display-3 text-center">BLOG</p>
            </div>
        </React.Fragment>
    )
}

export default Layout;