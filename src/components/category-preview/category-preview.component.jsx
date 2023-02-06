import { useNavigate } from 'react-router';
import ProductCard from '../product-card/product-card.component';
import {
	CategoryPreviewContainer,
	CategoryTitle,
	Preview,
} from './category-preview.styles';

const CategoryPreview = ({ title, products }) => {
	const navigate = useNavigate();
	const categoryBtnHandler = () => {
		navigate(`./${title}`);
	};

	return (
		<CategoryPreviewContainer>
			<h2>
				<CategoryTitle onClick={categoryBtnHandler}>
					{title.toUpperCase()}
				</CategoryTitle>
			</h2>

			<Preview>
				{products
					.filter((_, index) => index < 4)
					.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</Preview>
		</CategoryPreviewContainer>
	);
};

export default CategoryPreview;
