import React from 'react';

function Categories({ value, onClickCat }) {

    const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Plant Based'];

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, i) => <li onClick={() => onClickCat(i)} key={i} className={value === i ? 'active' : ''}>{categoryName}</li>)}
            </ul >
        </div >
    )
}

export default Categories;