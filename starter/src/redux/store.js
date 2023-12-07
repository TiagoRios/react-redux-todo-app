import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

// a loja guarda todos os redutores e os gerencia para nós
export default configureStore({
    reducer: {
        todos: todoReducer
    }
})