import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BudgetState {
  monthlyBudget: number;
  spentAmount: number;
}

const initialState: BudgetState = {
  monthlyBudget: 0,
  spentAmount: 0,
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {

    setMonthlyBudget: (state, action: PayloadAction<number>) => {
      state.monthlyBudget = action.payload;
    },
    updateSpentAmount: (state, action: PayloadAction<number>) => {
      state.spentAmount = action.payload;
    },
  },
});

export const { setMonthlyBudget, updateSpentAmount } = budgetSlice.actions;
export const selectBudget = (state: { budget: BudgetState }) => state.budget;
export default budgetSlice.reducer;