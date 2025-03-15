import React from 'react';
import {Outlet} from 'react-router-dom';

import styles from './style.module.css';

function Frame() {
	return (
		<div className={styles['frame']}>
			<div className={styles['content']}>
				<Outlet />
			</div>
		</div>
	);
}

export default Frame;
