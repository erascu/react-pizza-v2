import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryId: 0,
    sortId: '-rating',
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSortId(state, action) {
            state.sortId = action.payload;
        },
        setFilters(state, action) {
            state.categoryId = Number(action.payload.categoryId);
            state.sortId = action.payload.sortId;
        }
    },
})

export const { setCategoryId, setSortId, setFilters } = filterSlice.actions;

export default filterSlice.reducer;