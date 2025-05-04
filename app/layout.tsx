import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../theme/muiTheme";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
