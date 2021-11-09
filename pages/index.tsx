import Todo from '../components/Todo/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTodoData } from '../store/reducers/todoReducer';
import { todoActions } from '../store/actions/todoActions';
import { sendTodoData } from '../store/reducers/todoReducer';

let isInitial = true;

const Home =() => {
  const dispatch = useDispatch();
  const todos = useSelector((state: {todos: []}) => state.todos);
  
  useEffect(()=> {
    dispatch(fetchTodoData(todoActions.replaceTodos, todoActions.isLoading))
  },[])

  useEffect(()=> {
    if(isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendTodoData(todos));
  }, [todos])

  return (
      <Todo />
  )
}


export default Home;
