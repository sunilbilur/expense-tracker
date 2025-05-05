'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const TopExpenses = () => {
  const expenses = useSelector((state: RootState) => state.expenses.items);
  const topExpenses = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <Paper sx={{ p: 2, height: '100%' }} elevation={1}>
      <Typography variant="h6" gutterBottom>
        Top Expenses
      </Typography>
      <List>
        {topExpenses.map(e => (
          <ListItem key={e.id} disablePadding>
            <ListItemText primary={e.title} secondary={`₹${e.amount.toFixed(2)}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TopExpenses;