import Directory from '../../components/directory/directory.component';

const Home = () => {
	const SHOP_NOW = 'Shop Now';

	return (
		<div>
			<Directory SHOP_NOW={SHOP_NOW} />
		</div>
	);
};

export default Home;
