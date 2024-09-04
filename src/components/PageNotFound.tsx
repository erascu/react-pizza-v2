import React from 'react';

const PageNotFound: React.FC = () => {
  return (
    <div className="container">
      <div className="notfound">
        <div className="notfound__text">
          <img src="img/pizza-logo.svg" alt="" />
          <h1>404</h1>
        </div>
        <h2><span>Oops!</span> Something went wrong!</h2>
        <p>Page not found</p>
      </div>
    </div>
  )
}

export default PageNotFound;