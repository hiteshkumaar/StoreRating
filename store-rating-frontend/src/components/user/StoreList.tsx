import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { getStores } from '../../services/api';
import RatingForm from './RatingForm';

interface Store {
  id: number;
  name: string;
  address: string;
  ratings: any[];
}

const StoreList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getStores({ name: search });
        setStores(response.data);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };
    fetchStores();
  }, [search]);

  const handleRatingSubmitted = async () => {
    const response = await getStores({ name: search });
    setStores(response.data);
  };

  return (
    <div>
      <Typography variant="h4">Stores</Typography>
      <TextField
        label="Search by Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Average Rating</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stores.map((store) => (
            <TableRow key={store.id}>
              <TableCell>{store.name}</TableCell>
              <TableCell>{store.address}</TableCell>
              <TableCell>
                {store.ratings.length > 0
                  ? (store.ratings.reduce((sum: number, r: any) => sum + r.value, 0) / store.ratings.length).toFixed(1)
                  : 'N/A'}
              </TableCell>
              <TableCell>
                <RatingForm storeId={store.id} onRatingSubmitted={handleRatingSubmitted} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StoreList;