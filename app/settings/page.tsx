'use client';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ColorModeContext } from '../../theme/muiTheme';
import { Button, Box, Typography } from '@mui/material';
import { RootState } from '../../redux/store';

const SettingsPage = () => {
  const { toggleColorMode } = useContext(ColorModeContext);
  const expenses = useSelector((state: RootState) => state.expenses.items);

  const handleExport = () => {
    const header = ['id', 'title', 'amount', 'category', 'date'];
    const rows = expenses.map(e => [e.id, e.title, e.amount, e.category, e.date]);
    const csvContent = [header, ...rows]
      .map(r => r.join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'expenses.csv';
    link.click();
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Box mb={2}>
        <Button variant="contained" onClick={toggleColorMode}>
          Toggle Dark Mode
        </Button>
      </Box>
      <Box>
        <Button variant="outlined" onClick={handleExport}>
          Export Expenses to CSV
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsPage;