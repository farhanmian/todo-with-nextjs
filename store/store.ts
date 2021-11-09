import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './reducers/todoReducer';

const store = configureStore({
    reducer: todoSlice.reducer
});

export default store;