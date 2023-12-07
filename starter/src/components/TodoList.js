import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTodosAsync } from '../redux/todoSlice';
import TodoItem from './TodoItem';

const TodoList = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos); // `todos` nome do redutor definido dentro da store.

	// Chamada para thunk API.
	useEffect(() => {
		dispatch(getTodosAsync());
	}, [dispatch])

	return (
		<ul className='list-group'>
			{todos.map(todo => (
				<TodoItem
					completed={todo.completed}
					id={todo.id}
					key={todo.id}
					title={todo.title}
				/>
			))}
		</ul>
	);
};

export default TodoList;
