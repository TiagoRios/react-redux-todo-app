import { createSlice } from "@reduxjs/toolkit";
import {
    addTodoAsync,
    deleteTodoAsync,
    getTodosAsync,
    toggleCompleteAsync,
} from "./todoAsync";

export const todoSlice = createSlice({
    name: 'todos',

    initialState: [
        // { id: 1, title: 'dormir antes das 22h', completed: true },
        // { id: 2, title: 'alimentar cão', completed: false },
        // { id: 3, title: 'passear cão', completed: false },
        // { id: 4, title: 'estudar', completed: false },
        // { id: 5, title: 'fazer desafio de código', completed: false },
    ],

    reducers: {
        addTodo: (state, action) => {
            const todo = {
                title: action.payload.title
            };

            state.push(todo)
        },

        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload.id)
        },

        toggleComplete: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        }
        // outrosReducers
    },

    extraReducers: {
        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo);
        },

        [deleteTodoAsync.fulfilled]: (state, action) => {
            return state.filter(todo => todo.id !== action.payload.id)
        },

        [getTodosAsync.fulfilled]: (state, action) => {
            return action.payload.todos;
        },

        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todo.id);
            state[index].completed = action.payload.todo.completed;
        },
    },
});

// createSlice cria a ações com base nos nomes do redutor.
export const { addTodo, deleteTodo, toggleComplete } = todoSlice.actions;

export {
    addTodoAsync,
    deleteTodoAsync,
    getTodosAsync,
    toggleCompleteAsync,
}

export default todoSlice.reducer; // Usado na store
