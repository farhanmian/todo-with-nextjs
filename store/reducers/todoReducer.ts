import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addTodo(state, action) {
            const newTodo = { id: action.payload.id, todo: action.payload.todo, isComplete: false };
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
        }
    }
});

export default todoSlice;


export const sendTodoData = (todo: { id: number, todo: string, isComplete: boolean }) => {
    return async () => {
        localStorage.setItem(`${todo.id}`, JSON.stringify({ todo: todo.todo, id: todo.id, isComplete: todo.isComplete }));
    }
};

export const fetchTodoData = (dispatchAction: (parameter: object) => void) => {
    return async (dispatch: any) => {
        const fetchData = async () => {
            let values = [],
                keys = Object.keys(localStorage),
                i = keys.length;

                for(let a = 0; a < keys.length-1; a++ ) {
                    if(parseInt(keys[a])) {
                        console.log(a+1);
                        localStorage.getItem(`${a+1}`) && values.push(localStorage.getItem(`${a+1}`));
                    }
                }

            // for(let a = keys.length; a > 0; a--) {
            //     if(parseInt(keys[a])) {
            //         // console.log(localStorage.getItem(`${a}`))
            //         // values.push(localStorage.getItem(keys[a]));
            //         values.push(localStorage.getItem(`${3}`));
            //     }
            // }

            const updatedValues = values.map(value => {
                return JSON.parse(value);
            });
            return updatedValues;

        }

        const fetchedTodos = await fetchData();
        dispatch(dispatchAction(fetchedTodos))
        console.log(fetchedTodos);
    }
}