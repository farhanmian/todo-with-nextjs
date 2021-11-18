import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    categories: [],
    todos: [],
    isLoading: true,

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
                    return { 
                        id: todo.id, 
                        todo: todo.todo, 
                        category: todo.category,
                        isComplete: !todo.isComplete,
                    }
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
        },

        replaceCategories(state, action) {
            state.categories = action.payload;
        },
        addCategory(state, action) {
            const category = action.payload;
            state.categories.push(category);
        }
    }
});

export default todoSlice;


export const sendTodoData = (todo: { todo: string, isComplete: boolean, id: number, category: string, }) => {

    return async () => {
        fetch(`https://nextjs-redux-ts-todo-default-rtdb.firebaseio.com/${todo.category}/${todo.id}.json`, {
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
            const res = await fetch('https://nextjs-redux-ts-todo-default-rtdb.firebaseio.com/.json');
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
                const arrayOfObjects = [].concat.apply([], aryOfData);
                
                const arrayOfArrys = arrayOfObjects.map((todo: object) => {
                    return Object.keys(todo).map(key => {
                        return todo[key];
                    })
                });
                const arrayOfTodo = [].concat.apply([], arrayOfArrys);
                arrayOfTodo ? dispatch(replaceTodos(arrayOfTodo)) : dispatch(replaceTodos([]));

                dispatch(isLoading(false));
            } else if (!res.ok) {
                dispatch(isLoading(false));
            }
        }

        fetchData();
    }
}


export const updateTodoData = (todo: { isComplete: boolean, todo: string, id: number, category: string }) => {
    const category = todo.category;
    const id = todo.id;

    return async () => {
        fetch(`https://nextjs-redux-ts-todo-default-rtdb.firebaseio.com/${category}/${id}.json`, {
            method: 'PUT',
            body: JSON.stringify({ 'updateTodo': todo }), /// updating todo (updating isComplete property)
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export const deleteTodo = (id: number, category: string) => {
    return async () => {
        fetch(`https://nextjs-redux-ts-todo-default-rtdb.firebaseio.com/${category}/${id}.json`, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
};

export const sendCategory = (title: string) => {
    return async () => {
        const id = Math.ceil(Math.random() * 1000)
        fetch(`https://nextjs-redux-ts-todo-default-rtdb.firebaseio.com/${title}/${id}.json`, {
            method: 'POST',
            body: JSON.stringify({ id, todo: 'going to gym', isComplete: false, category: `${title}` }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
};


export const getCategoriesData = (replaceCategory) => {
    return async (dispatch) => {
        const res = await fetch(`https://nextjs-redux-ts-todo-default-rtdb.firebaseio.com/.json`);
        const data = await res.json();

        const categories = Object.keys(data).map(key => {
            return key
        })
        dispatch(replaceCategory(categories));
    }
};


