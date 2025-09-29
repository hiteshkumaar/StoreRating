import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { submitRating } from '../../services/api';

interface RatingFormProps {
  storeId: number;
  onRatingSubmitted: () => void;
}

const RatingForm: React.FC<RatingFormProps> = ({ storeId, onRatingSubmitted }) => {
  const [value, setValue] = useState('');

  const handleSubmit = async () => {
    try {
      await submitRating({ storeId, value: parseInt(value) });
      setValue('');
      onRatingSubmitted();
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div>
      <Typography variant="h6">Rate Store</Typography>
      <TextField
        type="number"
        label="Rating (1-5)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{ min: 1, max: 5 }}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default RatingForm;