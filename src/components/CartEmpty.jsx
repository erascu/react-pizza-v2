import React from 'react';

import { Link } from 'react-router-dom';

function CartEmpty() {
    return (
        <>
            <div className="container--cart">
                <div className="cart cart--empty">
                    <h2>Cart is empty 😕</h2>
                    <p>
                        Most likely, you haven't ordered anything yet.<br />
                        To order something, go to the main page.
                    </p>
                    <img src="/img/empty-cart.png" alt="Empty cart" />
                    <Link to="/" className="button button--black">
                        <span>Back to Main Page</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default CartEmpty;