import React from 'react';
import sclogo from "../assets/images/sclogo.jpg"

export const Header = () => {
    return (
        <header id='header' className="bg-surface-primary border-bottom pt-6">
            <div className="container">
                <div className="mb-npx">
                    <div className="row align-items-center">
                        <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                            <h1 className="h2 mb-0 ls-tight">
                                <img src={sclogo} width="40" className="rounded-circle" /> SCHOOL'S NAME UNIVERSITY
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

