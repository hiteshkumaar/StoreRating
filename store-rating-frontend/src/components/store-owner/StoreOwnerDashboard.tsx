import { useState, useEffect } from 'react';
import { getStoresByOwner, getRatingsByStore, getAverageRating } from '../../services/api';
import { useAuth } from '../../services/auth';

const StoreOwnerDashboard = () => {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const storesRes = await getStoresByOwner(user.userId);
      setStores(storesRes.data);
      if (storesRes.data.length > 0) {
        const ratingsRes = await getRatingsByStore(storesRes.data[0].id);
        setRatings(ratingsRes.data);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div>
      <h2>Store Owner Dashboard</h2>
      {stores.map((store: any) => (
        <div key={store.id}>
          <h3>{store.name}</h3>
          <p>
            Average Rating: {
              ratings.length > 0
                ? (
                    (ratings.reduce((sum: number, rating: any) => sum + rating.value, 0) / ratings.length).toFixed(2)
                  )
                : 'No ratings'
            }
          </p>
          <ul>
            {ratings.map((rating: any) => (
              <li key={rating.id}>
                {rating.user.name}: {rating.value}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={signOut}>Logout</button>
    </div>
  );
};

export default StoreOwnerDashboard;