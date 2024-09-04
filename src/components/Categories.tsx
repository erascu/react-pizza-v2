import React from 'react';

type CategoriesProps = {
    value: number;
    onClickCat: any;
}

const Categories: React.FC<CategoriesProps> = ({ value, onClickCat }) => {

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