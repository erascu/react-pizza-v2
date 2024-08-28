import React from 'react';
// import axios from 'axios';
import qs from 'qs';

import Skeleton from '../components/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Sort, { sortNames } from '../components/Sort';
import Search from '../components/Search/Search';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { items, status } = useSelector(state => state.pizzas);
    const pizzas = items;

    const categoryId = useSelector(state => state.filter.categoryId);
    const sortId = useSelector(state => state.filter.sortId);

    const [searchValue, setSearchValue] = React.useState('');

    React.useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchPizzas({ categoryId, sortId, searchValue }));
        }

        fetchData();

        window.scrollTo(0, 0);
    }, [categoryId, sortId, searchValue]);

    React.useEffect(() => {
        const queryString = qs.stringify({
            categoryId,
            sortId,
        });

        // const params = qs.parse(window.location.search.substring(1));

        navigate(`?${queryString}`);
    }, [categoryId, sortId]); //using "navigate hook and qs" we can show the link in the adress line

    // const pageQty = Math.round(Number(pizzas.length) / 4);

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onClickCat={(i) => dispatch(setCategoryId(i))} />
                    <Sort />
                </div>
                <div className="content__block">
                    <h2 className="content__title">Pizzas</h2>
                    <Search searchValue={searchValue} setSearchValue={setSearchValue} />
                </div>
                {status === 'error' &&
                    <div className="content__error">
                        <h3>😕</h3>
                        <h2>Oops! Something went wrong.</h2>
                        <p>We're sorry, but we couldn't load the data. Please try again later.</p>
                        <p>If the problem persists, please check your internet connection or contact support for further assistance.</p>
                    </div>}
                <div className="content__items">
                    {status === 'loading' ? [...new Array(4)].map((_, i) => <Skeleton key={i} />) : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
                </div>
            </div>
        </>
    )
}

export default Home;
