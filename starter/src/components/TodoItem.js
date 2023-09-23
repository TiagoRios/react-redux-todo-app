import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleteAsync, deleteTodoAsync } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {
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
						style={{ marginRight: '5px' }}
						type='checkbox'
						className='mr-3'
						onChange={handleChecboxChange}
						checked={completed}>
					</input>
					{title}
				</span>
				<button
					className='btn btn-danger'
					onClick={handleDeleteClick}
				>
					Delete
				</button>
			</div>
		</li>
	);
};

export default TodoItem;
