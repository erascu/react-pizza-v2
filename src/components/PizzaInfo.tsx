import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const PizzaInfo: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        title: string;
        info: string;
    }>();
    //to add type to React Hook in TS we need to open "<>"" after useState and enter needed params, in our case it's an object

    const { id } = useParams();

    React.useEffect(() => {
        async function fetchPizzas() {
            try {
                const { data } = await axios.get('https://ffd7ac7335d0bda6.mokky.dev/pizzas/' + id);
                setPizza(data);
            } catch (error) {
                console.log('Something went wrong - ' + error);
            }
        }

        fetchPizzas();
    }, []);

    if (!pizza) {
        return <div className="container loading-img">
            <img src="/img/loading.gif" alt="Loading" />
        </div>
    }

    return (
        <div className="container">
            <div className="pizzainfo-block">
                <div className="pizzainfo-block__main">
                    <div className="pizzaimg">
                        <img src={pizza.imageUrl} alt="Pizza" />
                    </div>
                    <div className="pizzainfo-block__right">
                        <h2>{pizza.title}</h2>
                        <p>{pizza.info}</p>
                        <Link to='/' className="button button--black">
                            <span>Back to Main Page</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PizzaInfo;