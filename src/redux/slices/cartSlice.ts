import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

export type CartItem = {
    id: number;
    title: string;
    price: number;
    count: number;
    imageUrl: string;
    sizes: number;
    types: string;
}

interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
}

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice,
    items,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem(state, action: PayloadAction<number>) {
            const findItem = state.items.find(obj => obj.id === action.payload);

            if (findItem) {
                findItem.count--;
                state.totalPrice -= findItem.price;
            }
        },
        removeItem(state, action: PayloadAction<number>) {
            const findItem = state.items.find(obj => obj.id === action.payload);

            if (findItem) {
                state.totalPrice -= findItem.price * findItem.count;
                state.items = state.items.filter(obj => obj.id !== action.payload);
            }
        },
        clearItems(state) {
            if (window.confirm('Are you sure you want to remove all items?')) {
                state.items = [];
                state.totalPrice = 0;
            }
        },
    },
})

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;