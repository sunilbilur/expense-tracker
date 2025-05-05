'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectBudget } from '../../features/budget/budgetSlice';
import { Box, Typography, LinearProgress } from '@mui/material';

const BudgetProgress = () => {
  const { monthlyBudget, spentAmount } = useSelector(selectBudget);
  const remainingAmount = monthlyBudget - spentAmount;
  const progress = (spentAmount / monthlyBudget) * 100;

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6">Budget Progress</Typography>
      <LinearProgress
        variant="determinate"
        value={progress > 100 ? 100 : progress}
        sx={{ marginTop: 1 }}
      />
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        Spent: ₹ {spentAmount.toFixed(2)} / ₹ {monthlyBudget.toFixed(2)}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        Remaining: ₹ {remainingAmount.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default BudgetProgress;
