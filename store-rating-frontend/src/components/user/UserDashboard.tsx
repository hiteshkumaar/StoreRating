import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getStores, submitRating, getUserRating } from '../../services/api';

const UserDashboard: React.FC = () => {
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState({ name: '', address: '' });
  const [rating, setRating] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchStores = async () => {
      const response = await getStores(filter);
      setStores(response.data);
      response.data.forEach(async (store: any) => {
        const userRating = await getUserRating(store.id);
        setRating((prev) => ({ ...prev, [store.id]: userRating.data?.value || 0 }));
      });
    };
    fetchStores();
  }, [filter]);

  const handleRatingSubmit = async (storeId: number, value: number) => {
    await submitRating({ storeId, value });
    setRating((prev) => ({ ...prev, [storeId]: value }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Stores
      </Typography>
      <TextField
        label="Search by Name"
        value={filter.name}
        onChange={(e) => setFilter({ ...filter, name: e.target.value })}
      />
      <TextField
        label="Search by Address"
        value={filter.address}
        onChange={(e) => setFilter({ ...filter, address: e.target.value })}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Your Rating</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stores.map((store: any) => (
            <TableRow key={store.id}>
              <TableCell>{store.name}</TableCell>
              <TableCell>{store.address}</TableCell>
              <TableCell>{store.ratings.length > 0 ? (store.ratings.reduce((sum: number, r: any) => sum + r.value, 0) / store.ratings.length).toFixed(1) : 'N/A'}</TableCell>
              <TableCell>{rating[store.id] || 'Not rated'}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  inputProps={{ min: 1, max: 5 }}
                  onChange={(e) => setRating({ ...rating, [store.id]: parseInt(e.target.value) })}
                />
                <Button onClick={() => handleRatingSubmit(store.id, rating[store.id])}>Submit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default UserDashboard;