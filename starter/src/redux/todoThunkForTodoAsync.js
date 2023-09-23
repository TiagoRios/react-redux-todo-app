const BASE_URL = 'http://localhost:7000/todos';

// Uma conversão (Thunk) é uma função que retorna outra função.
export const myThunkGetTodos = async () => {
    try {
        const res = await fetch(BASE_URL, { method: "GET" })

        if (res.ok) {
            const todos = await res.json();
            // Este objeto esta dentro de action.payload.todos
            return { todos } // Objeto contendo os "TODOS"
        }

    } catch (error) {
        showErrorMsg(error.message)
    }
}

export const myThunkAddTodo = async (myPayload) => {
    try {
        const res = await fetch(BASE_URL,
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
        showErrorMsg(error.message)
    }
}

export const myThunkToggleCompleteAsync = async (outroPayload) => {
    try {
        const res = await fetch(BASE_URL + `/${outroPayload.id}`,
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
        showErrorMsg(error.message)
    }
}

const showErrorMsg = (message) => {
    console.error(`\n\nERROR: ${message}\n\n`);
}