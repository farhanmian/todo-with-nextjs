import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './reducers/todoReducer';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCN_vynzEUnbDRBDxyTVlFhftcG90dUNa0",
    authDomain: "nextjs-redux-ts-todo.firebaseapp.com",
    databaseURL: "https://nextjs-redux-ts-todo-default-rtdb.firebaseio.com",
    projectId: "nextjs-redux-ts-todo",
    storageBucket: "nextjs-redux-ts-todo.appspot.com",
    messagingSenderId: "949731796301",
    appId: "1:949731796301:web:46fa1b53c410e322278304"
};
const firebaseApp = initializeApp(firebaseConfig);


const store = configureStore({
    reducer: todoSlice.reducer
});

export default store;