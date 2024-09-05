import React from 'react';
import { setSortId } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';

export const sortNames = ['-rating', 'price', '-price', 'title'];
const sortItems = ['popularity', 'price low to high', 'price high to low', 'alphabet'];

const Sort: React.FC = () => {
    const dispatch = useAppDispatch();
    const sortRef = React.useRef<HTMLDivElement>(null);

    // const sortItems = ['popularity', 'price low to high', 'price high to low', 'alphabet'];
    // const sortNames = ['-rating', 'price', '-price', 'title'];

    const [open, setOpen] = React.useState(false);
    const [sortActive, setSortActive] = React.useState(0);

    function sortChoosen(chosenItem: number) {
        setSortActive(chosenItem);
        dispatch(setSortId(sortNames[chosenItem]));
        setOpen(false);
    }

    React.useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (!e.composedPath().includes(sortRef.current)) {
                setOpen(false);
            }
        }

        document.body.addEventListener('click', handleClickOutside);

        return () => document.body.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div ref={sortRef} className="sort">
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