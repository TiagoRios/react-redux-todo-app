import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    myThunkAddTodo,
    myThunkDeleteAsync,
    myThunkGetTodos,
    myThunkToggleCompleteAsync,
} from "./todoThunkForTodoAsync";

// Usado em extraReducers do createSlice
export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync', // nome atribuito a função.
    myThunkAddTodo
)

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteAsync',
    myThunkDeleteAsync
)

export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    myThunkGetTodos
)

export const toggleCompleteAsync = createAsyncThunk(
    'todos/toggleCompleteAsync',
    myThunkToggleCompleteAsync
)
