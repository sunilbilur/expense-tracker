'use client';
import React, { useState, useMemo } from 'react';
import { Box, Container } from '@mui/material';
import ExpenseForm from '../components/expenses/ExpenseForm';
import TopExpenses from '../components/dashboard/TopExpenses';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import ExpenseFilterBar from '../components/expenses/ExpenseFilterBar';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00bcd4', '#ffb6c1'];

type FilterType = 'all' | 'today' | 'yesterday' | 'month' | 'custom';

export default function HomePage() {
  const allExpenses = useSelector((state: RootState) => state.expenses.items);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [customRange, setCustomRange] = useState<{ start: string; end: string }>({ start: '', end: '' });

  const filteredExpenses = useMemo(() => {
    const now = new Date();
    return allExpenses.filter(exp => {
      const date = new Date(exp.date);
      switch (filterType) {
        case 'today': {
          const today = new Date();
          return date.toDateString() === today.toDateString();
        }
        case 'yesterday': {
          const yesterday = new Date();
          yesterday.setDate(now.getDate() - 1);
          return date.toDateString() === yesterday.toDateString();
        }
        case 'month':
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        case 'custom':
          if (customRange.start && customRange.end) {
            return date >= new Date(customRange.start) && date <= new Date(customRange.end);
          }
          return true;
        default:
          return true;
      }
    });
  }, [allExpenses, filterType, customRange]);

  // Chart data remains same, using allExpenses or filteredExpenses as needed
  const categoryTotals = filteredExpenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);
  const pieData = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));

  const handleFilterChange = (type: FilterType, start?: string, end?: string) => {
    setFilterType(type);
    if (type === 'custom' && start && end) setCustomRange({ start, end });
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Left Panel: 60% width */}
        <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: '0 0 60%', p: 2, overflow: 'auto' }}>
            <ExpenseForm />
          </Box>
          <Box sx={{ flex: '0 0 40%', display: 'flex', p: 2, gap: 2 }}>
            <Box sx={{ width: '50%', height: '100%' }}>
              <TopExpenses />
            </Box>
            <Box sx={{ width: '50%', height: '100%' }}>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Typography>Add expenses to see chart.</Typography>
              )}
            </Box>
          </Box>
        </Box>

        {/* Right Panel: 40% width, Full Height */}
        <Box sx={{ width: '40%', p: 2, overflowY: 'auto' }}>
          <ExpenseFilterBar onFilterChange={handleFilterChange} />
          <Paper sx={{ maxHeight: 'calc(100% - 80px)', overflow: 'auto' }}>
            <List>
              {filteredExpenses.map(e => (
                <ListItem key={e.id} divider>
                  <ListItemText
                    primary={`${e.title} — ₹${e.amount.toFixed(2)}`}
                    secondary={`${e.category} | ${new Date(e.date).toLocaleDateString()}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
