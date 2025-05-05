"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteExpense } from "../../features/expenses/expensesSlice";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ExpenseList() {
  const expenses = useSelector((state: RootState) => state.expenses.items);
  const dispatch = useDispatch();

  return (
    <List>
      {expenses.map((expense) => (
        <ListItem
          key={expense.id}
          secondaryAction={
            <IconButton
              edge="end"
              onClick={() => dispatch(deleteExpense(expense.id))}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText
            primary={expense.title}
            secondary={`${expense.category} — $${expense.amount}`}
          />
        </ListItem>
      ))}
      {expenses.length === 0 && (
        <>
          <h1>No Expeses yet</h1>
          <p className="font-light text-2xl">Start adding some</p>
        </>
      )}
    </List>
  );
}
