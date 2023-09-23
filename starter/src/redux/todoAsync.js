import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    myThunkAddTodo,
    myThunkGetTodos,
    myThunkDeleteAsync,
    myThunkToggleCompleteAsync,
} from "./todoThunkForTodoAsync";

// Usado em extraReducers do createSlice
export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync', // nome atribuito a função.
    myThunkGetTodos
)

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    myThunkAddTodo
)

export const toggleCompleteAsync = createAsyncThunk(
    'todos/toggleCompleteAsync',
    myThunkToggleCompleteAsync
)

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteAsync',
    myThunkDeleteAsync
)