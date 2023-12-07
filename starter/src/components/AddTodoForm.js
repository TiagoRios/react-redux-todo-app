import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTodoAsync } from '../redux/todoSlice';

const AddTodoForm = () => {
	const [value, setValue] = useState('');
	const dispatch = useDispatch();

	const onSubmit = (event) => {
		event.preventDefault();

		if (value) {
			// title vai ficar no payload da ação.
			dispatch(addTodoAsync({ title: value }))
		}

		setValue('')
	};

	return (
		<form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
			<label className='sr-only'>Name</label>

			<input
				className='form-control mb-2 mr-sm-2'
				onChange={(event) => setValue(event.target.value)}
				placeholder='Add todo...'
				type='text'
				value={value}
			/>

			<button type='submit' className='btn btn-primary mb-2'>
				Submit
			</button>
		</form>
	);
};

export default AddTodoForm;
