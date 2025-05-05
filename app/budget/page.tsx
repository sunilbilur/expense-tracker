'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMonthlyBudget, updateSpentAmount } from '../../features/budget/budgetSlice';
import { Box, Typography } from '@mui/material';
import BudgetForm from '../../components/budget/BudgetForm';
import BudgetProgress from '../../components/budget/BudgetProgress';

const BudgetPage = () => {
  const dispatch = useDispatch();
  const { monthlyBudget, spentAmount } = useSelector((state) => state.budget);

  useEffect(() => {
    // Update spent amount based on filtered expenses (assuming you calculate this from the expenses list)
    const totalSpent = 1000; // Replace this with actual calculation logic
    dispatch(updateSpentAmount(totalSpent));
  }, [dispatch]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Monthly Budget
      </Typography>
      <BudgetForm />
      {monthlyBudget > 0 && <BudgetProgress />}
    </Box>
  );
};

export default BudgetPage;
