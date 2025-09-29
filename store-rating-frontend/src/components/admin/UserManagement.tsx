import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { createUser, getUsers } from '../../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', address: '', role: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers({});
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    try {
      await createUser(newUser);
      setNewUser({ name: '', email: '', password: '', address: '', role: '' });
      const response = await getUsers({});

      setUsers(response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">User Management</Typography>
      <TextField
        label="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <TextField
        label="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <TextField
        label="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <TextField
        label="Address"
        value={newUser.address}
        onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
      />
      <TextField
        label="Role"
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
      />
      <Button onClick={handleCreateUser}>Create User</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;