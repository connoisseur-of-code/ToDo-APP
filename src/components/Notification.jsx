import React, { useEffect, useState } from 'react';

const Notification = ({ message, onClose }) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
			onClose();
		}, 3000);

		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<div
			className={`mt-4 fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-md shadow-md transition-opacity duration-500 ${
				visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
		>
			{message}
		</div>
	);
};

export default Notification;
