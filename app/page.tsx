import React from 'react';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import { Container, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Expense Tracker</Typography>
      <ExpenseForm />
      <ExpenseList />
    </Container>
  );
}
