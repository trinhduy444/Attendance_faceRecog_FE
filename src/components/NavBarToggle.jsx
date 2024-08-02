import React from 'react';
import sclogo from "../assets/images/sclogo.jpg";

function NavBarToggle({ toggleNavBar }) {
    return (
        <a className="btn btn-light rounded bg-white " id="sidebarToggle" type='button' onClick={toggleNavBar}>
            <img src={sclogo} width="40" className="rounded-circle" />
        </a>
    );
}

export default React.memo(NavBarToggle);
