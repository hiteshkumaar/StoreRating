import { useState, useEffect } from 'react';
import StoreList from './StoreList';
import { getStores } from '../../services/api';
import { useAuth } from '../../services/auth';
import './UserDashBoard.css';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { signOut, user } = useAuth();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await getStores({});
        console.log('getStores response:', res.data);
        setStores(res.data);
      } catch (err) {
        console.error('Failed to fetch stores:', err);
        setError('Failed to load stores');
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  return (
    <div className="user-dashboard">
      <div className="container">
        <div className="header">
          <h2>Welcome to Your Dashboard, User {user?.userId}</h2>
          <button onClick={signOut} className="logout-btn">
            Logout
          </button>
        </div>
        {loading && <p className="loading">Loading stores...</p>}
        {error && <p className="error">{error}</p>}
        <div className="card">
          <h3>Available Stores</h3>
          <StoreList stores={stores} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;