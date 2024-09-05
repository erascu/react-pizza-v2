import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type FetchPizzasArgs = {
    categoryId: number;
    sortId: string;
    searchValue: string;

}

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params: FetchPizzasArgs) => {
    const { categoryId, sortId, searchValue } = params;
    const { data } = await axios.get<Pizza[]>(`https://ffd7ac7335d0bda6.mokky.dev/pizzas?sortBy=${sortId}${categoryId > 0 ? `&category=${categoryId}` : ''}${searchValue ? `&title=*${searchValue}*` : ''}`);

    return data;
});

export type Pizza = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING;
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                console.log(action.error.name, '-', action.error.message);
                state.status = Status.ERROR;
                state.items = [];
            })
    }
})

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;