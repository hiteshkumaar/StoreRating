import { useState } from 'react';
import { submitRating, updateRating, getAverageRating } from '../../services/api';
import RatingForm from './RatingForm';

const StoreList = ({ stores }: { stores: any[] }) => {
  const [filters, setFilters] = useState({ name: '', address: '' });
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleRatingSubmit = async (storeId: number, value: number, ratingId?: number) => {
    if (ratingId) {
      await updateRating(ratingId, value);
    } else {
      await submitRating({ storeId, value });
    }
    const res = await getAverageRating(storeId);
    setRatings((prev) => ({ ...prev, [storeId]: res.data }));
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      store.address.toLowerCase().includes(filters.address.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={handleFilterChange}
        placeholder="Filter by name"
      />
      <input
        type="text"
        name="address"
        value={filters.address}
        onChange={handleFilterChange}
        placeholder="Filter by address"
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Rating</th>
            <th>Submit Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>{ratings[store.id] || 'No ratings'}</td>
              <td>
                <RatingForm storeId={store.id} onSubmit={handleRatingSubmit} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;