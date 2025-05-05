'use client'
import React from 'react';
import { CssBaseline } from '@mui/material';
import { CustomThemeProvider } from '../theme/muiTheme';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Navbar from '../components/layout/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <CustomThemeProvider>
            <CssBaseline />
            <Navbar />
            {children}
          </CustomThemeProvider>
        </Provider>
      </body>
    </html>
  );
}