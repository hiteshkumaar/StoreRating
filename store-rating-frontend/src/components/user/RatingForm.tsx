import { useState } from 'react';

const RatingForm = ({ storeId, onSubmit }: { storeId: number; onSubmit: (storeId: number, value: number, ratingId?: number) => void }) => {
  const [value, setValue] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(storeId, value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={value} onChange={(e) => setValue(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RatingForm;