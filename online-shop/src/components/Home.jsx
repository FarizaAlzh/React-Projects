import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Our Online Shop!</h1>
      <p className="home-description">
        Explore a wide range of products from electronics to home goods. Find great deals and shop now!
      </p>
      
      <img src="photos/onlineshop.jpeg" alt="Project Image" className="home-image" />

      <p className="home-start">
        Get started by browsing through our collection of items.
      </p>
    </div>
  );
};

export default Home;
