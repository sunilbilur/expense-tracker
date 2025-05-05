'use client';
import React, { useState } from 'react';
import { Box, Button, ButtonGroup, TextField } from '@mui/material';

type FilterType = 'all' | 'today' | 'yesterday' | 'month' | 'custom';

interface Props {
  onFilterChange: (type: FilterType, start?: string, end?: string) => void;
}

export default function ExpenseFilterBar({ onFilterChange }: Props) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const handleFilter = (type: FilterType) => {
    setFilter(type);
    onFilterChange(type);
  };

  const applyCustom = () => {
    setFilter('custom');
    onFilterChange('custom', customStart, customEnd);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <ButtonGroup variant="outlined" sx={{ mb: 1 }}>
        <Button onClick={() => handleFilter('all')}>All</Button>
        <Button onClick={() => handleFilter('today')}>Today</Button>
        <Button onClick={() => handleFilter('yesterday')}>Yesterday</Button>
        <Button onClick={() => handleFilter('month')}>This Month</Button>
      </ButtonGroup>
      {filter === 'custom' ? (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            label="Start Date"
            type="date"
            value={customStart}
            onChange={e => setCustomStart(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            type="date"
            value={customEnd}
            onChange={e => setCustomEnd(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" onClick={applyCustom}>Apply</Button>
        </Box>
      ) : null}
    </Box>
  );
}