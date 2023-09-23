import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Uma conversão (Thunk) é uma função que retorna outra função.
const myThunkGetTodos = async () => {
    const URL = 'http://localhost:7000/todos';

    try {
        const res = await fetch(URL, { method: "GET" })
        if (res.ok) {
            const todos = await res.json();
            return { todos } // Objeto contendo os "TODOS"
        }
    } catch (error) {
        console.error(`fetch ERROR: ${error.message}`);
    }
}

// Usado em extraReducers do createSlice
export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync', // nome atribuito a função 'getTodosAsync'
    myThunkGetTodos
)

export const todoSlice = createSlice({
    name: 'todos',

    initialState: [
        { id: 1, title: 'dormir antes das 22h', completed: false },
        { id: 2, title: 'alimentar cão', completed: true },
        { id: 3, title: 'passear cão', completed: true },
        { id: 4, title: 'estudar', completed: true },
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
    },
});

// createSlice cria a ações com base nos nomes do redutor.
export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;