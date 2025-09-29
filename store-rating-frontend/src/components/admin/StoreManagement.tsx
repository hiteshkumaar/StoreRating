import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { createStore, getStores } from '../../services/api';

interface Store {
  id: number;
  name: string;
  address: string;
  ownerId: number;
}

const StoreManagement: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [newStore, setNewStore] = useState({ name: '', address: '', ownerId: '' });

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getStores({});
        setStores(response.data);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };
    fetchStores();
  }, []);

  const handleCreateStore = async () => {
    try {
      await createStore({ ...newStore, ownerId: parseInt(newStore.ownerId) });
      setNewStore({ name: '', address: '', ownerId: '' });
      const response = await getStores({});
      setStores(response.data);
    } catch (error) {
      console.error('Error creating store:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Store Management</Typography>
      <TextField
        label="Store Name"
        value={newStore.name}
        onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
      />
      <TextField
        label="Address"
        value={newStore.address}
        onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
      />
      <TextField
        label="Owner ID"
        value={newStore.ownerId}
        onChange={(e) => setNewStore({ ...newStore, ownerId: e.target.value })}
      />
      <Button onClick={handleCreateStore}>Create Store</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Owner ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stores.map((store) => (
            <TableRow key={store.id}>
              <TableCell>{store.name}</TableCell>
              <TableCell>{store.address}</TableCell>
              <TableCell>{store.ownerId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StoreManagement;