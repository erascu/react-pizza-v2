import React from 'react';
import { useSelector } from 'react-redux';
import { addItem, CartItem } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { RootState, useAppDispatch } from '../redux/store';

const doughType = ['thin', 'traditional'];

type PizzaBlockProps = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
    const dispatch = useAppDispatch();
    const cartItem = useSelector((state: RootState) => state.cart.items.find(obj => obj.id === id));

    const addedCount = cartItem ? cartItem.count : 0;

    const [sizeActive, setSizeActive] = React.useState(0);
    const [doughActive, setDoughActive] = React.useState(0);

    const onClickAdd = () => {
        const item: CartItem = {
            id,
            title,
            price,
            imageUrl,
            sizes: sizes[sizeActive],
            types: doughType[doughActive],
            count: 0,
        }

        dispatch(addItem(item));
    };

    return (
        <div className="pizza-flex">
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{title} <Link to={`/pizza/${id}`}><i>i</i></Link></h4>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((doughId) => <li onClick={() => setDoughActive(doughId)} key={doughId} className={doughActive === doughId || types.length < 2 ? "active" : ""}>{doughType[doughId]}</li>)}
                    </ul>
                    <ul>
                        {sizes.map((size, i) => <li onClick={() => setSizeActive(i)} key={i} className={sizeActive === i ? 'active' : ''}>{size} cm</li>)}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">{price} lei</div>
                    <button onClick={onClickAdd} className="button button--outline button--add" >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Add to cart</span>
                        <i>{addedCount}</i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PizzaBlock;