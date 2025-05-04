'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../features/expenses/expensesSlice';
import { Button, TextField, MenuItem } from '@mui/material';

const categories = ['Food', 'Travel', 'Utilities', 'Other'];

export default function ExpenseForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addExpense({ title, amount: +amount, category, date }));
    setTitle('');
    setAmount('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} fullWidth margin="normal" />
      <TextField label="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} fullWidth margin="normal" />
      <TextField select label="Category" value={category} onChange={e => setCategory(e.target.value)} fullWidth margin="normal">
        {categories.map(cat => (
          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
        ))}
      </TextField>
      <TextField label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
      <Button type="submit" variant="contained" fullWidth> Add Expense </Button>
    </form>
  );
}