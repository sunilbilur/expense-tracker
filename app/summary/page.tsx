'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const SummaryPage = () => {
  const expenses = useSelector((state: RootState) => state.expenses.items);

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Expense Summary
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Total Spent This Month</Typography>
          <Typography variant="h4">₹ {totalAmount.toFixed(2)}</Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Total by Category
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(categoryTotals).map(([category, amount]) => (
          <Grid item xs={12} sm={6} md={4} key={category}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">{category}</Typography>
                <Typography variant="h6">₹ {amount.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SummaryPage;