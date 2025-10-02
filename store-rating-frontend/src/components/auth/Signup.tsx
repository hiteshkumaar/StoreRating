import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/api';
import './SignUp.css'; // Shared CSS for auth pages

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });
  type Errors = {
    name?: string;
    email?: string;
    password?: string;
    address?: string;
    general?: string;
  };
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: any = {};
    if (formData.name.length < 20) newErrors.name = 'Name must be at least 20 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!/^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$/.test(formData.password))
      newErrors.password = 'Password must be 8-16 characters with an uppercase letter and a special character';
    if (formData.address.length > 400) newErrors.address = 'Address cannot exceed 400 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await signup(formData);
      navigate('/login');
    } catch (error) {
      setErrors({ general: 'Signup failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up for Store Rating</h2>
        <p className="tagline">Rate and discover stores easily!</p>
        <form onSubmit={handleSubmit} aria-label="Signup form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              aria-describedby="name-error"
            />
            {errors.name && <span id="name-error" className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              aria-describedby="email-error"
            />
            {errors.email && <span id="email-error" className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              aria-describedby="password-error"
            />
            {errors.password && <span id="password-error" className="error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
              aria-describedby="address-error"
            />
            {errors.address && <span id="address-error" className="error">{errors.address}</span>}
          </div>
          {errors.general && <span className="error">{errors.general}</span>}
          <button type="submit" disabled={loading || Object.keys(errors).length > 0}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;