import React from 'react';
import axios from 'axios';
import qs from 'qs';

import Skeleton from '../components/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Sort, { sortNames } from '../components/Sort';
import Search from '../components/Search/Search';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const categoryId = useSelector(state => state.filter.categoryId);
    const sortId = useSelector(state => state.filter.sortId);

    const [pizzas, setPizzas] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    // const [categoryId, setCategoryId] = React.useState(0);
    // const [changeSort, setChangeSort] = React.useState(0);
    const [searchValue, setSearchValue] = React.useState('');

    // const [changeCat, setChangeCat] = React.useState(0);

    //fetch('https://ffd7ac7335d0bda6.mokky.dev/pizzas').then(respond => respond.json()).then(items => setPizzas(items)); //this is a infinite loop, fetch should be within useEffect hook (setPizzas useState keeps rerender fetch data)

    // React.useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1));

    //         const sortName = sortNames.find(obj => obj === params.sortId);
    //         // const sortItem = sortItems.find(obj => obj === params.categoryId);

    //         dispatch(
    //             setFilters({ ...params, sortName }),
    //         );
    //     }
    // }, []);

    React.useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const response = await fetch(`https://ffd7ac7335d0bda6.mokky.dev/pizzas?sortBy=${sortId}${categoryId > 0 ? `&category=${categoryId}` : ''}${searchValue ? `&title=*${searchValue}*` : ''}`);
            const data = await response.json();
            setPizzas(data);
            setLoading(false);
        }
        fetchData();

        window.scrollTo(0, 0);
    }, [categoryId, sortId, searchValue]);

    React.useEffect(() => {
        const queryString = qs.stringify({
            categoryId,
            sortId,
        });

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
                <div className="content__items">
                    {loading ? [...new Array(4)].map((_, i) => <Skeleton key={i} />) : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)} {/* {...pizza} means that all the Props that contanin Pizzas Array will be included, don't need to write "image={pizza.imageUrl} type={pizza.type} etc."*/}
                </div>
            </div>
        </>
    )
}

export default Home;
