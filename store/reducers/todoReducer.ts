import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    todos: [],
    isLoading: true
};

const todoSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addTodo(state, action) {
            const newTodo = { id: Math.random() * 10, todo: action.payload, isComplete: false };
            state.todos.push(newTodo);
        },
        removeTodo(state, action) {
            const todoId = action.payload;
            const updatedTodos = state.todos.filter(todo => todo.id !== todoId);
            state.todos = updatedTodos;
        },
        isCompleteTodo(state, action) {
            const todoId = action.payload;
            const updatedTodos = state.todos.map(todo => {
                if (todo.id === todoId) {
                    return { id: todo.id, todo: todo.todo, isComplete: !todo.isComplete }
                } else {
                    return todo
                }
            });
            
            
            state.todos = updatedTodos;
        },
        replaceTodos(state, action) {
            state.todos = action.payload;
        },
        isLoading (state, action) {
            state.isLoading = action.payload
        }
    }
});

export default todoSlice;


export const sendTodoData = (todos: {}[]) => {
    return async () => {
        fetch('https://nextjs-redux-ts-todo-default-rtdb.firebaseio.com/todos.json', {
            method: 'PUT',
            body: JSON.stringify(todos ? todos : []),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
};

export const fetchTodoData = (replaceTodos: (parameter: object) => void, isLoading: (parameter: boolean) => void) => {
    return async (dispatch: any) => {
        const fetchData = async () => {
            dispatch(isLoading(true));
            const res = await fetch('https://nextjs-redux-ts-todo-default-rtdb.firebaseio.com/todos.json');
            if(res.ok) {
                const data = await res.json();
                data ? dispatch(replaceTodos(data)) : dispatch(replaceTodos([]));
                dispatch(isLoading(false));
            } else if(!res.ok) {
                dispatch(isLoading(false));
            }

        }

        fetchData();
    }
}