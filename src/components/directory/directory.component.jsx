import DirectoryItem from '../directory-item/directory-item.component';
import './directory.scss';

const Directory = ({ categories, SHOP_NOW }) => {
	return (
		<div className='categories-container'>
			{categories.map((category) => (
				<DirectoryItem
					category={category}
					key={category.id}
					SHOP_NOW={SHOP_NOW}
				/>
			))}
		</div>
	);
};

export default Directory;
