import {
	BackgroundImage,
	ContainerBody,
	DirectoryItemContainer,
} from './directory-item';
import { useNavigate } from 'react-router';
import { DirectoryCategory } from '../directory/directory.component';

type DirectoryProps = {
	category: DirectoryCategory;
	SHOP_NOW: string;
};

const DirectoryItem = ({ category, SHOP_NOW }: DirectoryProps) => {
	const { title, imageUrl, route } = category;
	const navigate = useNavigate();

	const onNavigateHandler = () => {
		navigate(route);
	};

	return (
		<DirectoryItemContainer onClick={onNavigateHandler}>
			<BackgroundImage imageUrl={imageUrl} />
			<ContainerBody>
				<h2>{title}</h2>
				<p>{SHOP_NOW}</p>
			</ContainerBody>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
