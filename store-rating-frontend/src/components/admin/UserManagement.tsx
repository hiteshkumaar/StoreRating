import { useState, useEffect } from 'react';
import { createUser, getUsers } from '../../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'user', // Default role
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers({});
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    try {
      // Pass both newUser and role to createUser
      await createUser(newUser, newUser.role);
      setNewUser({ name: '', email: '', password: '', address: '', role: 'user' });
      const response = await getUsers({});
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to create user', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleCreateUser(); }}>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Name"
          minLength={20}
          maxLength={60}
          required
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          placeholder="Password"
          pattern="^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$"
          required
        />
        <input
          type="text"
          name="address"
          value={newUser.address}
          onChange={handleInputChange}
          placeholder="Address"
          maxLength={400}
          required
        />
        <select name="role" value={newUser.role} onChange={handleInputChange} required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="store_owner">Store Owner</option>
        </select>
        <button type="submit">Create User</button>
      </form>

      <h3>Users List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;