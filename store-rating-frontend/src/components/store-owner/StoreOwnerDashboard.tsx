import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getStores, getRatingsByStore, getStoreRating } from '../../services/api';

const StoreOwnerDashboard: React.FC = () => {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState<Record<number, { ratings: any[]; average: number }>>({});
  
  useEffect(() => {
    const fetchStores = async () => {
      const response = await getStores({});
      setStores(response.data.filter((store: any) => store.owner.id === parseInt(localStorage.getItem('userId') || '0')));
      response.data.forEach(async (store: any) => {
        const storeRatings = await getRatingsByStore(store.id);
        const averageRating = await getStoreRating(store.id);
        setRatings((prev) => ({ ...prev, [store.id]: { ratings: storeRatings.data, average: averageRating.data } }));
      });
    };
    fetchStores();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Stores
      </Typography>
      {stores.map((store: any) => (
        <div key={store.id}>
          <Typography variant="h6">{store.name}</Typography>
          <Typography>Average Rating: {ratings[store.id]?.average.toFixed(1) || 'N/A'}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ratings[store.id]?.ratings.map((rating: any) => (
                <TableRow key={rating.id}>
                  <TableCell>{rating.user.name}</TableCell>
                  <TableCell>{rating.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </Container>
  );
};

export default StoreOwnerDashboard;