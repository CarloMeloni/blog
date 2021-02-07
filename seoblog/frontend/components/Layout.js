import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div className="layout-background">
            <div>
            <Header />
                {children}
            </div>
            <div className="col-md-12">
                <p className="display-3 text-center">BLOG - contatti</p>
            </div>
            
        </div>
    )
}

export default Layout;