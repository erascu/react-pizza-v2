import React from 'react';
import { useDispatch } from 'react-redux';
import { setSortId } from '../redux/slices/filterSlice';

export const sortNames = ['-rating', 'price', '-price', 'title'];
const sortItems = ['popularity', 'price low to high', 'price high to low', 'alphabet'];

function Sort() {
    const dispatch = useDispatch();

    // const sortItems = ['popularity', 'price low to high', 'price high to low', 'alphabet'];
    // const sortNames = ['-rating', 'price', '-price', 'title'];

    const [open, setOpen] = React.useState(false);
    const [sortActive, setSortActive] = React.useState(0);

    function sortChoosen(chosenItem) {
        setSortActive(chosenItem);
        dispatch(setSortId(sortNames[chosenItem]));
        setOpen(false);
    }


    return (
        <div className="sort">
            <div onClick={() => setOpen(!open)} className="sort__label">
                <img className={open ? 'rotate' : 'arrow-top'} src="img/arrow-top.svg" alt="Arrow icon" />
                <b>Sort by:</b>
                <span>{sortItems[sortActive]}</span>
            </div>
            <div className={`sort__popup ${open === false && 'hidden'}`} >
                <ul>
                    {sortItems.map((item, i) => <li onClick={() => sortChoosen(i)} key={i} className={sortActive === i ? "active" : ""}>{item}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default Sort;