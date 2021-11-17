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
            state.todos.push(action.payload);
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
        isLoading(state, action) {
            state.isLoading = action.payload
        }
    }
});

export default todoSlice;


export const sendTodoData = (todo: { todo: string, isComplete: boolean, id: number }) => {

    return async () => {
        fetch(`https://nextjs-redux-ts-todo-default-rtdb.firebaseio.com/todos/${todo.id}.json`, {
            method: 'POST',
            body: JSON.stringify(todo),
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
            if (res.ok) {
                const data = await res.json();
                const objData = data && Object.keys(data).map((key, i) => {
                    return data[key]
                });
                const aryOfData = objData && objData.map(todo => {
                    return Object.keys(todo).map(key => {
                        return todo[key]
                    })
                });
                const arrayOfTodo = [].concat.apply([], aryOfData);
                console.log(arrayOfTodo);
                arrayOfTodo ? dispatch(replaceTodos(arrayOfTodo)) : dispatch(replaceTodos([]));
                dispatch(isLoading(false));
            } else if (!res.ok) {
                dispatch(isLoading(false));
            }
        }

        fetchData();
    }
}


export const updateTodoData = (todo: { isComplete: boolean, todo: string, id: number }) => {
    return async () => {
        fetch(`https://nextjs-redux-ts-todo-default-rtdb.firebaseio.com/todos/${todo.id}.json`, {
            method: 'PUT',
            body: JSON.stringify({ 'updateTodo': {todo: todo.todo, id: todo.id, isComplete: !todo.isComplete} }), /// updating todo (updating isComplete property)
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export const deleteTodo = (id: number) => {
    return async () => {
        fetch(`https://nextjs-redux-ts-todo-default-rtdb.firebaseio.com/todos/${id}.json`, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
};