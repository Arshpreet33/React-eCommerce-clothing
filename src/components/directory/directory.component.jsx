import CategoryItem from '../category-item/category-item.component';
import './directory.scss';

const Directory = ({ categories, SHOP_NOW }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem
          category={category}
          key={category.id}
          SHOP_NOW={SHOP_NOW}
        />
      ))}
    </div>
  );
};

export default Directory;
