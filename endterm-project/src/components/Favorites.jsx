import useFavorites from '../hooks/useFavorites';

const Favorites = () => {
  const { favorites, removeFavorite, mergeMessage } = useFavorites();

  return (
    <div className="app-container">
      <div className="card">
        <h2>Your Favorites</h2>
        {mergeMessage && <p>{mergeMessage}</p>}
        {favorites.length === 0 ? (
          <p>No items in favorites</p>
        ) : (
          <div className="favorites-list">
            {favorites.map((item) => (
              <div className="favorite-item card" key={item.id}>
                <h3>{item.title}</h3>
                {item.image && <img src={item.image} alt={item.title} width="120" />}
                <div style={{ marginTop: 8 }}>
                  <button className="btn secondary" onClick={() => removeFavorite(String(item.id))}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;