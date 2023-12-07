import React from 'react';
import { useDispatch } from 'react-redux';

import { toggleCompleteAsync, deleteTodoAsync } from '../redux/todoSlice';

const TodoItem = ({ completed, id, title }) => {
	const dispatch = useDispatch();

	const handleChecboxChange = () => {
		// id e completed são passadas pelo payload.
		dispatch(toggleCompleteAsync({ id, completed: !completed }))
	}

	const handleDeleteClick = () => {
		// somente id é passado pelo payload.
		dispatch(deleteTodoAsync({ id }))
	}

	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input
						checked={completed}
						className='mr-3'
						onChange={handleChecboxChange}
						style={{ marginRight: '5px' }}
						type='checkbox'
					/>

					{title}
				</span>

				<button className='btn btn-danger' onClick={handleDeleteClick}>
					Delete
				</button>
			</div>
		</li>
	);
};

export default TodoItem;
