import styles from '../styles/Home.module.css'
import Todo from '../components/Todo/Todo';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchTodoData } from '../store/reducers/todoReducer';
import { todoActions } from '../store/actions/todoActions';

const Home =() => {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(fetchTodoData(todoActions.replaceTodos))
  },[])

  return (
    <div className={styles.container}>
      <Todo />
    </div>
  )
}


export default Home;
