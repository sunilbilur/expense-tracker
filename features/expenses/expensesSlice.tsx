import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

interface ExpensesState {
  items: Expense[];
  budget: Record<string, number>;
  filters: { dateRange: [string, string] | null; category: string | null; amountRange: [number, number] | null };
}

const initialState: ExpensesState = {
  items: [],
  budget: {},
  filters: { dateRange: null, category: null, amountRange: [0, Infinity] },
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Omit<Expense, "id">>) => {
      state.items.push({ ...action.payload, id: uuidv4() });
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((e) => e.id !== action.payload);
    },
    setBudget: (
      state,
      action: PayloadAction<{ category: string; amount: number }>
    ) => {
      state.budget[action.payload.category] = action.payload.amount;
    },
    setFilters: (state, action: PayloadAction<ExpensesState["filters"]>) => {
      state.filters = action.payload;
    },
  },
});

const matchesFilters = (expense: Expense, filters: ExpensesState['filters']): boolean => {
  const { dateRange, category, amountRange } = filters;
  const date = new Date(expense.date);

  // Date range
  if (dateRange) {
    const [start, end] = dateRange.map(d => new Date(d));
    if (date < start || date > end) return false;
  }

  // Category
  if (category && expense.category !== category) return false;

  // Amount range
  const [min, max] = amountRange!;
  if (expense.amount < min || expense.amount > max) return false;

  return true;
};

export const selectFilteredExpenses = (state: RootState) => {
  const { items, filters } = state.expenses;
  return items.filter(exp => matchesFilters(exp, filters));
};

export const { addExpense, deleteExpense, setBudget, setFilters } = expensesSlice.actions;
export default expensesSlice.reducer;
