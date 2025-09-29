import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Box } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
import { getUsers, getStores, getRatingsByStore } from '../../services/api';

interface DashboardStats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({ totalUsers: 0, totalStores: 0, totalRatings: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const users = await getUsers({});
        const storesResponse = await getStores({});
        const stores = storesResponse.data;
        const ratings = await Promise.all(stores.map((store: any) => getRatingsByStore(store.id)));
        setStats({
          totalUsers: users.data.length,
          totalStores: stores.length,
          totalRatings: ratings.reduce((sum: number, r: any[]) => sum + r.length, 0),
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box display="flex" gap={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{stats.totalUsers}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Total Stores</Typography>
              <Typography variant="h4">{stats.totalStores}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Total Ratings</Typography>
              <Typography variant="h4">{stats.totalRatings}</Typography>
            </CardContent>
          </Card>
      </Box>
    </div>
  );
};

export default AdminDashboard;