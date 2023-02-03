import './category-item.scss';

const CategoryItem = ({ category, SHOP_NOW }) => {
  const { title, imageUrl } = category;
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>{SHOP_NOW}</p>
      </div>
    </div>
  );
};

export default CategoryItem;
