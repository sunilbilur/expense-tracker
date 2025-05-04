import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
}

const initialState: ExpensesState = {
  items: [],
  budget: {},
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Omit<Expense, 'id'>>) => {
      state.items.push({ ...action.payload, id: uuidv4() });
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(e => e.id !== action.payload);
    },
    setBudget: (state, action: PayloadAction<{ category: string; amount: number }>) => {
      state.budget[action.payload.category] = action.payload.amount;
    },
  },
});

export const { addExpense, deleteExpense, setBudget } = expensesSlice.actions;
export default expensesSlice.reducer;