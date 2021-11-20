import { createSlice } from "@reduxjs/toolkit"
import { TodoType } from "../types/types";

const initialState : {categories: string[], todos: TodoType[], isLoading: boolean} = {
    categories: [],
    todos: [],
    isLoading: true,

};

const todoSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addTodo(state, action: {payload: TodoType}) {
            state.todos.push(action.payload);
        },
        removeTodo(state, action) {
            const todoId = action.payload;
            const updatedTodos = state.todos.filter(todo => todo.id !== todoId);
            state.todos = updatedTodos;
        },
        isCompleteTodo(state, action: {payload: number}) {
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
        replaceTodos(state, action: {payload: TodoType[]}) {
            state.todos = action.payload;
        },
        isLoading(state, action: {payload: boolean}) {
            state.isLoading = action.payload
        },

        replaceCategories(state, action: {payload: string[]}) {
            state.categories = action.payload;
        },
        addCategory(state, action: {payload: string}) {
            const category = action.payload;
            state.categories.push(category);
        },
        removeCategory(state, action: {payload: string}) {
            const category = action.payload;
            const updatedCategory = state.categories.filter(item => item !== category)
            const updatedTodos = state.todos.filter(todo => todo.category !== category);
            
            state.todos = updatedTodos;
            state.categories = updatedCategory;
        }
    }
});

export default todoSlice;


export const sendTodoData = (todo: TodoType) => {

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


export const fetchTodoData = (replaceTodos: (parameter: TodoType[]) => void, isLoading: (parameter: boolean) => void, replaceCategory: (parameter: string[]) => void) => {
    return async (dispatch: (parameter: void)=> void ) => {
        const fetchData = async () => {
            dispatch(isLoading(true));
            const res = await fetch('https://nextjs-redux-ts-todo-default-rtdb.firebaseio.com/.json');
            if (res.ok) {
                const data = await res.json();
                const categories = data && Object.keys(data).map(key => {
                    return key
                });

                const objData = data && Object.keys(data).map((key, i) => {
                    return data[key]
                });

                const aryOfData: [] = objData && objData.map((todo: {}[]) => {
                    return Object.keys(todo).map((key) => {
                        const id: number = +key
                        return todo[id]
                    })
                });

                const arrayOfObjects = [].concat.apply([], aryOfData);

                const arrayOfArrys = arrayOfObjects.map((todo) => {
                    return Object.keys(todo).map(key => {
                        return todo[key];
                    })
                });

                const arrayOfTodo: TodoType[] = [].concat.apply([], arrayOfArrys);
                dispatch(replaceTodos(arrayOfTodo ? arrayOfTodo : []))

                categories ? dispatch(replaceCategory(categories)) : dispatch(replaceCategory(['todos'])) ;
                dispatch(isLoading(false));
            } else if (!res.ok) {
                dispatch(isLoading(false));
            }
        }

        fetchData();
    }
}


export const updateTodoData = (todo: TodoType) => {
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
        const id = 0;
        const todo = {
            id,
            todo: 'What\'s your plan for today!',
            isComplete: false,
            category: `${title}`
        }
        fetch(`https://nextjs-redux-ts-todo-default-rtdb.firebaseio.com/${title}/${id}.json`, {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
};

export const deleteCategory = (category: string) => {
    return () => {
        fetch(`https://nextjs-redux-ts-todo-default-rtdb.firebaseio.com/${category}.json`, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}