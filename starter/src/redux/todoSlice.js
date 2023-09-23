import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Uma conversão (Thunk) é uma função que retorna outra função.
const myThunkGetTodos = async () => {
    const URL = 'http://localhost:7000/todos';

    try {
        const res = await fetch(URL, { method: "GET" })

        if (res.ok) {
            const todos = await res.json();
            // Este objeto esta dentro de action.payload.todos
            return { todos } // Objeto contendo os "TODOS"
        }

    } catch (error) {
        console.error(`\n\nERROR: ${error.message}\n\n`);
    }
}

const myThunkAddTodo = async (myPayload) => {
    const URL = 'http://localhost:7000/todos';

    try {
        const res = await fetch(URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: myPayload.title })
            })

        if (res.ok) {
            const todo = await res.json();
            // Este objeto esta dentro de action.payload.todo
            return { todo } // Objeto contendo apenas um "TODO"
        }

    } catch (error) {
        console.error(`\n\nERROR: ${error.message}\n\n`);
    }
}

const myThunkToggleCompleteAsync = async (outroPayload) => {
    const URL = `http://localhost:7000/todos/${outroPayload.id}`;

    try {
        const res = await fetch(URL,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: outroPayload.completed })
            })

        if (res.ok) {
            const todo = await res.json();
            // Este objeto esta dentro de action.payload.todo
            return { todo } // Objeto contendo apenas um "TODO"
        }

    } catch (error) {
        console.error(`\n\nERROR: ${error.message}\n\n`);
    }
}

// Usado em extraReducers do createSlice
export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync', // nome atribuito a função 'getTodosAsync'
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
    },
});

// createSlice cria a ações com base nos nomes do redutor.
export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;