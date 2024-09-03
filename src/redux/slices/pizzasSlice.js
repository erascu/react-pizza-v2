import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
    const { categoryId, sortId, searchValue } = params;
    const { data } = await axios.get(`https://ffd7ac7335d0bda6.mokky.dev/pizzas?sortBy=${sortId}${categoryId > 0 ? `&category=${categoryId}` : ''}${searchValue ? `&title=*${searchValue}*` : ''}`);

    return data;
});

const initialState = {
    items: [],
    status: 'loading',
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
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                console.log(action.error.name, '-', action.error.message);
                state.status = 'error';
                state.items = [];
            })
    }
})

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;