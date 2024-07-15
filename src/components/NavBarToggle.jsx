import React from 'react';

function NavBarToggle({ toggleNavBar }) {
    return (
        <div className="btnToggleNavBar">
            <button className="btn btn-light rounded border border-info" id="sidebarToggle" onClick={toggleNavBar}>
                <i className="bi bi-list"></i>
            </button>
        </div>
    );
}

export default React.memo(NavBarToggle);
