import React, { useEffect, useState } from 'react';
import Notification from './components/Notification';

function App() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState('');
	const [notification, setNotification] = useState(null);

	// Local Storage
	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
		setTasks(storedTasks);
	}, []);

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	// Notification
	const showNotification = (message) => {
		setNotification(message);

		// Clear notification after 3 seconds
		setTimeout(() => {
			setNotification(null);
		}, 3000); // 1 Second = 1000
	};

	// Add & Remove tasks
	const addTask = () => {
		if (newTask.trim() === '') {
			showNotification('Please enter a task name before adding!');
			return;
		}

		setTasks([...tasks, { text: newTask, completed: false }]);
		setNewTask('');
		showNotification(`Task "${newTask}" has been added!`);
	};

	const removeTask = (index) => {
		const removedTask = tasks[index];
		const newTasks = [...tasks];
		newTasks.splice(index, 1);
		setTasks(newTasks);

		showNotification(`Task "${removedTask.text}" has been removed!`);
	};

	// Toggling completeion status idk how to name it xD
	const toggleCompletion = (index) => {
		const newTasks = [...tasks];
		newTasks[index].completed = !newTasks[index].completed;
		setTasks(newTasks);
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
						<input
							type="checkbox"
							checked={task.completed}
							onChange={() => toggleCompletion(index)}
						/>
						<span className={`ml-2 ${task.completed ? 'line-through' : ''}`}>
							{task.text}
						</span>
						<button
							className="text-red-500 ml-2"
							onClick={() => removeTask(index)}
						>
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
