'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMonthlyBudget } from '../../features/budget/budgetSlice';
import { TextField, Button, Box } from '@mui/material';

const BudgetForm = () => {
  const dispatch = useDispatch();
  const [budget, setBudget] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setMonthlyBudget(parseFloat(budget)));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={2} sx={{ border: '1px solid #ddd', borderRadius: 2 }}>
      <TextField
        label="Set Monthly Budget"
        type="number"
        fullWidth
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" type="submit" fullWidth sx={{ marginTop: 2 }}>
        Set Budget
      </Button>
    </Box>
  );
};

export default BudgetForm;
