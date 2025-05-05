'use client';
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Expense Tracker
      </Typography>
      {[
        { label: 'Home', href: '/' },
        { label: 'Summary', href: '/summary' },
        { label: 'Charts', href: '/charts' },
        { label: 'Filters', href: '/filters' },
        { label: 'Budget', href: '/budget' },
        { label: 'Settings', href: '/settings' },
      ].map((item) => (
        <Button key={item.href} color="inherit" component={Link} href={item.href}>
          {item.label}
        </Button>
      ))}
    </Toolbar>
  </AppBar>
);

export default Navbar;