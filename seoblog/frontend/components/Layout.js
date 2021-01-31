import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <div style={{backgroundColor: '#ccc'}}>
            <Header />
                {children}
            </div>
            <div style={{ }} className="col-md-12">
                <p className="display-3 text-center">BLOG</p>
            </div>
            
        </React.Fragment>
    )
}

export default Layout;