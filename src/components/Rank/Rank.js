import React from 'react';

const Rank = (props) => {
	return(
		<div>
			<div className='white f3'>
				{`${props.user.name}, your current entry is....`}
			</div>
			<div className='white f1'>
				{props.user.entries}
			</div>
		</div>
		);
}

export default Rank;