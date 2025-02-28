import React from "react";

const NotFound: React.FC = () => {
  return (
    <>
      <div className="notfound no-item">
        <div className="no-item__img">
          <img src="/img/no-pizza.svg" alt="Slice of pizza" />
        </div>
        <h2>
          <span>Oops! </span>No pizzas found.
        </h2>
        <p>Try a different search!</p>
      </div>
    </>
  );
};

export default NotFound;
