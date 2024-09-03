import React from 'react';

import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <>
            <div className="notfound">
                <div className="notfound__text">
                    <img src="/img/404.png" alt="" />
                </div>
                <h2><span>Oops!</span> Something went wrong!</h2>
                <p>Page not found</p>
                <Link to='/' className="button button--black">
                    <span>Back to Main Page</span>
                </Link>
            </div>
        </>
    )
}

export default NotFound;