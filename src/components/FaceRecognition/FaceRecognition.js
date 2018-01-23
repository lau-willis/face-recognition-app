import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
	const renderBoxes = () => {
		var boxes = box.map((item, i) => {
			return <div key={i} className='bounding-box' style={{top: item.top_row, right: item.right_col, bottom: item.bottom_row, left: item.left_col}}></div>;
		})
		return boxes;
	}
	return(
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' src={imageUrl} alt="" width='500px' height='auto'/>
				{renderBoxes()};
			</div>
		</div>
		);
}

export default FaceRecognition;