import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterSliceState {
    categoryId: number;
    sortId: string;
}

const initialState: FilterSliceState = {
    categoryId: 0,
    sortId: '-rating',
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSortId(state, action: PayloadAction<string>) {
            state.sortId = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.categoryId = Number(action.payload.categoryId);
            state.sortId = action.payload.sortId;
        }
    },
})

export const { setCategoryId, setSortId, setFilters } = filterSlice.actions;

export default filterSlice.reducer;