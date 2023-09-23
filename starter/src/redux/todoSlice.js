import { createSlice } from "@reduxjs/toolkit";
import {
    addTodoAsync,
    getTodosAsync,
    deleteTodoAsync,
    toggleCompleteAsync, 
} from "./todoAsync";

export const todoSlice = createSlice({
    name: 'todos',

    initialState: [
        { id: 1, title: 'dormir antes das 22h', completed: true },
        { id: 2, title: 'alimentar cão', completed: false },
        { id: 3, title: 'passear cão', completed: false },
        { id: 4, title: 'estudar', completed: false },
        { id: 5, title: 'fazer desafio de código', completed: false },
    ],

    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: new Date(),
                title: action.payload.title,
                completed: false,
            };
            state.push(todo)
        },

        toggleComplete: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },

        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload.id)
        }
        // outrosReducers
    },

    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action) => {
            return action.payload.todos;
        },

        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo);
        },

        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todo.id);
            state[index].completed = action.payload.todo.completed;
        },

        [deleteTodoAsync.fulfilled]: (state, action) => {
            return state.filter(todo => todo.id !== action.payload.id)
        },
    },
});

export { getTodosAsync, addTodoAsync, toggleCompleteAsync, deleteTodoAsync }

// createSlice cria a ações com base nos nomes do redutor.
export const { addTodo, toggleComplete, deleteTodo, } = todoSlice.actions;

export default todoSlice.reducer;