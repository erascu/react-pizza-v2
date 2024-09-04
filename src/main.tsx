import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { store } from './redux/store';
import { Provider } from 'react-redux';

import App from './App';
import Home from './pages/Home';
import Cart from './components/Cart';
import PizzaInfo from './components/PizzaInfo';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/pizza/:id' element={<PizzaInfo />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

const rootElem = document.getElementById('root');

if (rootElem) {
  ReactDOM.createRoot(rootElem).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  )
}
