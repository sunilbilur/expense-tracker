"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setFilters } from "../../features/expenses/expensesSlice";
import { selectFilteredExpenses } from "../../features/expenses/expensesSlice";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { DateRangePicker, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CATEGORY_OPTIONS = [
  "Food",
  "Travel",
  "Utilities",
  "Entertainment",
  "Other",
];

export default function FiltersPage() {
  const dispatch = useDispatch();

  // Redux state
  const { dateRange, category, amountRange } = useSelector(
    (state: RootState) => state.expenses.filters
  );
  const filteredExpenses = useSelector(selectFilteredExpenses);

  // Local form state
  const [localDateRange, setLocalDateRange] = useState<[Date, Date] | null>(
    null
  );
  const [localCategory, setLocalCategory] = useState<string>(category || "");
  const [localMin, setLocalMin] = useState<string>(
    amountRange ? String(amountRange[0]) : "0"
  );
  const [localMax, setLocalMax] = useState<string>(
    amountRange && isFinite(amountRange[1]) ? String(amountRange[1]) : ""
  );

  useEffect(() => {
    if (dateRange) {
      setLocalDateRange([new Date(dateRange[0]), new Date(dateRange[1])]);
    }
  }, [dateRange]);

  const handleApplyFilters = () => {
    dispatch(
      setFilters({
        dateRange: localDateRange
          ? [localDateRange[0].toISOString(), localDateRange[1].toISOString()]
          : null,
        category: localCategory || null,
        amountRange: [
          parseFloat(localMin) || 0,
          localMax === "" ? Infinity : parseFloat(localMax),
        ],
      })
    );
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Left Panel: Filters (60%) */}
      <Box sx={{ width: "60%", p: 4, overflowY: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Filter Expenses
        </Typography>

        <Grid container alignContent={"flex-start"} spacing={2}>
          {/* Category */}
          <Grid item xs={6} md={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={localCategory}
                label="Category"
                onChange={(e) => setLocalCategory(e.target.value as string)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {CATEGORY_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Min Amount"
              type="number"
              fullWidth
              value={localMin}
              onChange={(e) => setLocalMin(e.target.value)}
            />
            <TextField
              label="Max Amount"
              type="number"
              fullWidth
              value={localMax}
              onChange={(e) => setLocalMax(e.target.value)}
            />
          </Grid>

          {/* Date Range */}
          <Grid item xs={6} md={6}>
            <DateRangePicker
              ranges={[
                {
                  startDate: localDateRange?.[0] ?? new Date(),
                  endDate: localDateRange?.[1] ?? new Date(),
                  key: "selection",
                },
              ]}
              onChange={(ranges: Record<string, Range>) => {
                const sel = ranges.selection;
                setLocalDateRange([sel.startDate!, sel.endDate!]);
              }}
              moveRangeOnFirstSelection={false}
            />
          </Grid>
        </Grid>

        <Box mt={2}>
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </Box>
      </Box>

      {/* Right Panel: Results (40%) */}
      <Box
        sx={{
          width: "40%",
          p: 4,
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Filtered Results ({filteredExpenses.length})
        </Typography>

        <List>
          {filteredExpenses.map((exp) => (
            <ListItem key={exp.id} divider>
              <ListItemText
                primary={`${exp.title} — ₹${exp.amount.toFixed(2)}`}
                secondary={`${exp.category} • ${new Date(
                  exp.date
                ).toLocaleDateString()}`}
              />
            </ListItem>
          ))}

          {filteredExpenses.length === 0 && (
            <Typography color="textSecondary">
              No expenses match your filters.
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
}
