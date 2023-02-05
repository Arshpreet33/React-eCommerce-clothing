import './directory-item.scss';

const DirectoryItem = ({ category, SHOP_NOW }) => {
	const { title, imageUrl } = category;
	return (
		<div className='directory-item-container'>
			<div
				className='background-image'
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			/>
			<div className='body'>
				<h2>{title}</h2>
				<p>{SHOP_NOW}</p>
			</div>
		</div>
	);
};

export default DirectoryItem;
