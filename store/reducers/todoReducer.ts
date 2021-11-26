import { createSlice } from "@reduxjs/toolkit"
import { TodoType } from "../types/types";
import { getDatabase, ref, set, child, get, remove, update } from "firebase/database";
import { formControlClasses } from "@mui/material";


const initialState: { categories: string[], todos: TodoType[], isLoading: boolean } = {
    categories: [],
    todos: [],
    isLoading: true,

};

const todoSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addTodo(state, action: { payload: TodoType }) {
            state.todos.push(action.payload);
        },
        removeTodo(state, action) {
            const todoId = action.payload;
            const updatedTodos = state.todos.filter(todo => todo.id !== todoId);
            state.todos = updatedTodos;
        },
        isCompleteTodo(state, action: { payload: number }) {
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
        replaceTodos(state, action: { payload: TodoType[] }) {
            state.todos = action.payload;
        },
        isLoading(state, action: { payload: boolean }) {
            state.isLoading = action.payload
        },

        replaceCategories(state, action: { payload: string[] }) {
            state.categories = action.payload;
        },
        addCategory(state, action: { payload: string }) {
            const category = action.payload;
            state.categories.push(category);
        },
        removeCategory(state, action: { payload: string }) {
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
    return () => {
        const db = getDatabase();
        console.log(todo);
        set(ref(db, 'todos/' + todo.id), {
            todo: todo.todo,
            isComplete: todo.isComplete,
            category: todo.category,
            id: todo.id
        });
    }
}

export const fetchTodoData = (replaceTodos: (parameter: TodoType[]) => void, isLoading: (parameter: boolean) => void, replaceCategory: (parameter: string[]) => void) => {
    return (dispatch: (parameter: void) => void) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `todos/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                if(Array.isArray(data)) {
                    dispatch(replaceTodos(data));
                    console.log(data);
                } else {
                    console.log(data);
                    const arrayOfTodos = Object.keys(data).map(key => {
                        return data[key];
                    });
                    dispatch(replaceTodos(arrayOfTodos));
                }
            
            } else {
                console.log("No data available");
                dispatch(replaceTodos([]));
            }
            dispatch(isLoading(false));
        }).catch((error) => {
            console.error(error);
            dispatch(isLoading(false));
        });

        get(child(dbRef, `categories/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log(data);
                dispatch(replaceCategory(['todos', ...data]));
            } else {
                console.log("No data available");
                dispatch(replaceCategory(['todos']));

            }
        }).catch((error) => {
            // error === 'Client is offline' ? console.log('it works error !!') : console.log(error.Error)
            console.log(error);
            window.location.reload();
        });
    }
}

export const updateTodoData = (todo: TodoType) => {
    const id = todo.id;
    console.log(id);

    return async () => {
        const db = getDatabase();
        update(ref(db, 'todos/' + todo.id), {
            todo: todo.todo,
            id: todo.id,
            category: todo.category,
            isComplete: todo.isComplete
        })
            .then(() => {
                console.log('Data saved successfully!');
            })
            .catch((error) => {
                console.log('The write failed...');
            });
    }
}

export const deleteTodo = (id: number, category: string) => {
    return async () => {
        const db = getDatabase();
        remove(ref(db, 'todos/' + id));
    }
};

export const sendCategory = (title: string, id: number) => {
    return async () => {
        const db = getDatabase();
        set(ref(db, 'categories/' + id), title);
    }
};

export const deleteCategory = (category: string, todos: TodoType[]) => {
    return () => {
        const db = getDatabase();
        remove(ref(db, 'categories/' + category));
        todos.map(todo => {
            if(todo.category === category) {
                remove(ref(db, 'todos/' + todo.id))
            }
        })
    }
}
