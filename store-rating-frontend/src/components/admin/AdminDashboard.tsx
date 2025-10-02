import { useState, useEffect } from 'react';
import { getUsers, getStores, getRatingsByStore } from '../../services/api';
import { useAuth } from '../../services/auth';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);
  const { signOut } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const usersRes = await getUsers({});
      const storesRes = await getStores({});
      const ratingsRes = await getRatingsByStore(0); // Adjust as needed
      setUsers(usersRes.data);
      setStores(storesRes.data);
      setRatings(ratingsRes.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Users: {users.length}</p>
      <p>Total Stores: {stores.length}</p>
      <p>Total Ratings: {ratings.length}</p>
      <button onClick={signOut}>Logout</button>
      {/* Add StoreManagement and UserManagement components */}
    </div>
  );
};

export default AdminDashboard;