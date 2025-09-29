import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box } from '@mui/material';
import { login } from '../../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('userId', response.data.userId.toString());
      if (response.data.role === 'admin') {
        navigate('/admin');
      } else if (response.data.role === 'store_owner') {
        navigate('/store-owner');
      } else {
        navigate('/user');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
      <Button onClick={() => navigate('/signup')} sx={{ mt: 2 }}>
        Don't have an account? Sign up
      </Button>
    </Box>
  );
};

export default Login;