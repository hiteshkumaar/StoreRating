import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { signup } from '../../services/api';

const Signup: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '', role: 'user' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await signup(form);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('userId', response.data.userId);
      if (response.data.role === 'admin') {
        navigate('/admin');
      } else if (response.data.role === 'store_owner') {
        navigate('/store-owner');
      } else {
        navigate('/user');
      }
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          value={form.role}
          label="Role"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="store_owner">Store Owner</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleSignup} fullWidth sx={{ mt: 2 }}>
        Signup
      </Button>
      <Button onClick={() => navigate('/login')} sx={{ mt: 2 }}>
        Already have an account? Login
      </Button>
    </Box>
  );
};

export default Signup;