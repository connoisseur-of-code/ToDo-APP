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
			style={{
				position: 'fixed',
				bottom: '0',
				right: '0',
				marginBottom: '4px',
				marginRight: '4px',
				padding: '1rem',
				backgroundColor: '#48bb78',
				color: '#fff',
				borderRadius: '0.25rem',
				opacity: visible ? 1 : 0,
				transform: `translateY(${visible ? '0' : '1rem'})`,
				transition: 'opacity 4.7s ease-in-out, transform 4.7s ease-in-out',
			}}
		>
			{message}
		</div>
	);
};

export default Notification;
