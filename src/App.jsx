import React, { useEffect, useState } from 'react';
import Notification from './components/Notification';

function App() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState('');
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
		setTasks(storedTasks);
	}, []);

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	const addTask = () => {
		if (newTask.trim() !== '') {
			setTasks([...tasks, newTask]);
			setNewTask('');
		}

		setNotification(`Task "${newTask}" has been added!`);
	};

	const removeTask = (index) => {
		const newTasks = [...tasks];
		const removedTask = tasks[index];
		newTasks.splice(index, 1);
		setTasks(newTasks);

		setNotification(`Task "${removedTask}" has been removed!`);
	};

	return (
		<div className="container mx-auto mt-8">
			<h1 className="text-3xl font-bold mb-4">ToDo App</h1>
			<div className="flex mb-4">
				<input
					type="text"
					className="border p-2 w-64"
					placeholder="Add a new task"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
				/>
				<button
					className="bg-blue-500 text-white py-2 px-4 ml-2"
					onClick={addTask}
				>
					Add
				</button>
			</div>
			<ul>
				{tasks.map((task, index) => (
					<li key={index} className="flex items-center mb-2">
						<span className="mr-2">{task}</span>
						<button className="text-red-500" onClick={() => removeTask(index)}>
							Remove
						</button>
					</li>
				))}
			</ul>
			{notification && (
				<Notification
					message={notification}
					onClose={() => setNotification(null)}
				/>
			)}
		</div>
	);
}

export default App;
